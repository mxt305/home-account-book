import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { DialogProps } from "@mui/material";
import { BankAccount } from "@prisma/client";
import { useFormik } from "formik";
import React, { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { useFormData } from "@/hooks";

import BankAccountForm, { BankAccountValue } from "./_form";

export type BankAccountFormDialogProps = DialogProps & {
  dataId?: number;
  onDataChange?: () => void;
};

function BankAccountFormDialog({
  dataId,
  onClose,
  onDataChange,
  ...props
}: BankAccountFormDialogProps) {
  const { t } = useTranslation();
  const formData = useFormData<BankAccountValue>({
    apiPath: "/api/bankAccount",
    id: dataId,
  });
  const handleClose = (event?: MouseEvent) => {
    onClose && onClose(event || {}, "backdropClick");
  };
  const validationSchema = yup.object({
    name: yup.string().label(t("field.name")).required(),
    note: yup.string().label(t("field.note")).nullable(),
  });
  const formik = useFormik<BankAccountValue>({
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
      <DialogTitle>{t(`common.${dataId ? "edit" : "add"}`)}</DialogTitle>
      <DialogContent>
        <BankAccountForm formik={formik} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveButton}>{t("common.save")}</Button>
        <Button onClick={handleClose}>{t("common.cancel")}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default BankAccountFormDialog;
