import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { DialogProps } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import React, { MouseEvent, useEffect, useMemo } from "react";

import { useFormData } from "@/hooks";
import { createAccountDataValidation } from "@/validation";

import AccountDataForm, { AccountDataValue } from "./_form";

const API_PATH = "api/accountData";

export type AccountDataFormDialogProps = DialogProps & {
  dataId?: number;
  onDataChange?: () => void;
};

function AccountDataFormDialog({
  open,
  dataId,
  onClose,
  onDataChange,
  ...props
}: AccountDataFormDialogProps) {
  const { t } = useTranslation();
  const formData = useFormData<AccountDataValue>({
    apiPath: API_PATH,
    id: dataId,
  });
  const handleClose = (event?: MouseEvent) => {
    onClose && onClose(event || {}, "backdropClick");
    formik.resetForm();
  };
  const validationSchema = createAccountDataValidation(t);
  const initialValues = useMemo(() => {
    if (formData.data) {
      return { ...formData.data, date: dayjs(formData.data.date) };
    }
    return {
      date: "",
      summary: "",
      amount: 0,
    };
  }, [formData.data]);
  const formik = useFormik<AccountDataValue>({
    initialValues,
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
  useEffect(() => {
    if (!dataId) {
      formik.setFieldValue("date", dayjs(), false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataId, open]);
  const handleSaveButton = async () => {
    await formik.submitForm();
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth {...props}>
      <DialogTitle>{t(`common:${dataId ? "edit" : "add"}`)}</DialogTitle>
      <DialogContent>
        <AccountDataForm formik={formik} isEdit={!!dataId} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveButton}>{t("common:save")}</Button>
        <Button onClick={handleClose}>{t("common:cancel")}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AccountDataFormDialog;
