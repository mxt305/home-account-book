import { Box, Stack } from "@mui/material";
import type { FormikProps } from "formik";
import { useTranslation } from "next-i18next";
import React from "react";

import TextField from "@/components/formik/TextField";

export interface CommonDataValue {
  name: string;
  note: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommonDataFormProps<DataValue extends CommonDataValue> {
  formik: FormikProps<DataValue>;
}

function CommonDataForm<DataValue extends CommonDataValue>({
  formik,
}: CommonDataFormProps<DataValue>) {
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
          label={t("field:name")}
          formik={formik}
        />
        <TextField
          fullWidth
          id="note"
          name="note"
          label={t("field:note")}
          formik={formik}
        />
      </Stack>
    </Box>
  );
}

export default CommonDataForm;
