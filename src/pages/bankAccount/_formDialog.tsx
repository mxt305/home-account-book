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

import BankAccountForm, { BankAccountValue } from "./_form";

export type BankAccountFormDialogProps = DialogProps & {
  dataId?: number;
  onDataChange: () => void;
};

function BankAccountFormDialog({
  dataId,
  onClose,
  onDataChange,
  ...props
}: BankAccountFormDialogProps) {
  const { t } = useTranslation();
  const handleClose = (event?: MouseEvent) => {
    formik.resetForm();
    onClose && onClose(event || {}, "backdropClick");
  };
  const validationSchema = yup.object({
    name: yup.string().label(t("field.name")).required(),
    note: yup.string().label(t("field.note")).nullable(),
  });
  const formik = useFormik<BankAccountValue>({
    initialValues: {
      name: "",
      note: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleClose();
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
