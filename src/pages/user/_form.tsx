import { Box, Stack } from "@mui/material";
import type { FormikProps } from "formik";
import { useTranslation } from "next-i18next";
import React from "react";

import { CommonDataSelect, Select, TextField } from "@/components/formik";

import { getTypeSelectionItem } from "./_commonValue";

export interface UserValue {
  name: string;
  username: string;
  password?: string;
  type: number | string;
  memberId?: number | string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserFormProps {
  formik: FormikProps<UserValue>;
  isEdit?: boolean;
}

function UserForm({ formik, isEdit }: UserFormProps) {
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
        <Select
          fullWidth
          id="type"
          name="type"
          label={t("field:type")}
          formik={formik}
          items={getTypeSelectionItem(t)}
        />
        <TextField
          fullWidth
          id="username"
          name="username"
          label={t("field:username")}
          formik={formik}
          disabled={isEdit}
        />
        {!isEdit && (
          <TextField
            fullWidth
            id="password"
            name="password"
            label={t("field:password")}
            formik={formik}
            disabled={isEdit}
          />
        )}
        <CommonDataSelect
          fullWidth
          nullable
          id="member"
          name="memberId"
          label={t("field:member")}
          formik={formik}
          apiPath="api/member"
        />
      </Stack>
    </Box>
  );
}

export default UserForm;
