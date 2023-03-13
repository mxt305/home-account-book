import { Box, Stack } from "@mui/material";
import { BankAccount } from "@prisma/client";
import type { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

import TextField from "@/components/formik/TextField";

export type BankAccountValue = Pick<BankAccount, "name" | "note">;

export interface BankAccountFormProps {
  formik: FormikProps<BankAccountValue>;
}

function BankAccountForm({ formik }: BankAccountFormProps) {
  const { t } = useTranslation();
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ mt: 1, width: "100%" }}
    >
      <Stack spacing={3}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label={t("field.name")}
          formik={formik}
        />
        <TextField
          fullWidth
          id="note"
          name="note"
          label={t("field.note")}
          formik={formik}
        />
      </Stack>
    </Box>
  );
}

export default BankAccountForm;
