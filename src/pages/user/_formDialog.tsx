import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { DialogProps } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import React, { MouseEvent } from "react";

import { useFormData } from "@/hooks";
import { createUserValidation } from "@/validation";

import UserForm, { UserValue } from "./_form";

const API_PATH = "api/user";

export type UserFormDialogProps = DialogProps & {
  dataId?: string;
  onDataChange?: () => void;
};

function UserFormDialog({
  dataId,
  onClose,
  onDataChange,
  ...props
}: UserFormDialogProps) {
  const { t } = useTranslation();
  const formData = useFormData<UserValue>({
    apiPath: API_PATH,
    id: dataId,
  });
  const handleClose = (event?: MouseEvent) => {
    onClose && onClose(event || {}, "backdropClick");
    formik.resetForm();
  };
  const validationSchema = createUserValidation(t);

  const formik = useFormik<UserValue>({
    initialValues: formData.data || {
      name: "",
      username: "",
      type: 0,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const mValue = {
        ...values,
        memberId: values.memberId === "" ? null : values.memberId,
      };
      formData.saveData(mValue).then(() => {
        onDataChange && onDataChange();
        handleClose();
      });
    },
  });

  const handleSaveButton = async () => {
    await formik.submitForm();
  };
  return (
    <Dialog onClose={onClose} maxWidth="md" fullWidth {...props}>
      <DialogTitle>{t(`common:${dataId ? "edit" : "add"}`)}</DialogTitle>
      <DialogContent>
        <UserForm formik={formik} isEdit={!!dataId} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveButton}>{t("common:save")}</Button>
        <Button onClick={handleClose}>{t("common:cancel")}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserFormDialog;
