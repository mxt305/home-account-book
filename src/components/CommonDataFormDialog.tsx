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
import { createCommonValidation } from "@/validation";

import CommonDataForm, { CommonDataValue } from "./CommonDataForm";

export type CommonDataFormDialogProps = DialogProps & {
  apiPath: string;
  dataId?: number;
  onDataChange?: () => void;
};

function CommonDataFormDialog({
  apiPath,
  dataId,
  onClose,
  onDataChange,
  ...props
}: CommonDataFormDialogProps) {
  const { t } = useTranslation();
  const formData = useFormData<CommonDataValue>({
    apiPath,
    id: dataId,
  });
  const handleClose = (event?: MouseEvent) => {
    onClose && onClose(event || {}, "backdropClick");
    formik.resetForm();
  };
  const validationSchema = createCommonValidation(t);

  const formik = useFormik<CommonDataValue>({
    initialValues: formData.data || {
      name: "",
      note: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formData.saveData(values).then(() => {
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
        <CommonDataForm formik={formik} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveButton}>{t("common:save")}</Button>
        <Button onClick={handleClose}>{t("common:cancel")}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommonDataFormDialog;
