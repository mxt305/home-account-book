import { Box, Stack } from "@mui/material";
import { Dayjs } from "dayjs";
import type { FormikProps } from "formik";
import { useTranslation } from "next-i18next";
import React from "react";

import {
  CommonDataSelect,
  DatePicker,
  Select,
  TextField,
} from "@/components/formik";

export interface AccountDataValue {
  id?: number;
  date: string | Dayjs;
  summary: string;
  amount: number;
  invoiceNumber?: string;
  memberId?: number | string | null;
  bankAccountId?: number | string | null;
  accountTypeId?: number | string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AccountDataFormProps {
  formik: FormikProps<AccountDataValue>;
  isEdit?: boolean;
}

function AccountDataForm({ formik, isEdit }: AccountDataFormProps) {
  const { t } = useTranslation();
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ mt: 1, width: "100%" }}
    >
      <Stack spacing={3}>
        <DatePicker
          fullWidth
          id="date"
          name="date"
          label={t("field:date")}
          formik={formik}
        />
        <CommonDataSelect
          fullWidth
          nullable
          id="bankAccount"
          name="bankAccountId"
          label={t("field:bankAccount")}
          formik={formik}
          apiPath="api/bankAccount"
        />
        <CommonDataSelect
          fullWidth
          nullable
          id="accountType"
          name="accountTypeId"
          label={t("field:accountType")}
          formik={formik}
          apiPath="api/accountType"
        />
        <CommonDataSelect
          fullWidth
          nullable
          id="accountType"
          name="memberId"
          label={t("field:member")}
          formik={formik}
          apiPath="api/member"
        />
        <TextField
          fullWidth
          id="summary"
          name="summary"
          label={t("field:summary")}
          formik={formik}
        />
        <TextField
          fullWidth
          type="number"
          id="amount"
          name="amount"
          label={t("field:amount")}
          formik={formik}
        />
      </Stack>
    </Box>
  );
}

export default AccountDataForm;
