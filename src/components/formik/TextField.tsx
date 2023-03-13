import { TextField as MuiTextField } from "@mui/material";
import type { TextFieldProps as MuiTextFTextFieldPropsield } from "@mui/material";
import type { FormikProps } from "formik";
import React from "react";

export type TextFieldProps = MuiTextFTextFieldPropsield & {
  formik: FormikProps<any>;
};

function TextField({ name, formik, ...props }: TextFieldProps) {
  const value = formik.values[name as keyof typeof formik.values];
  const errors = formik.errors[name as any];
  return (
    <MuiTextField
      {...props}
      name={name}
      value={value || ""}
      onChange={formik.handleChange}
      error={!!errors}
      helperText={errors ? (errors as any) : ""}
    />
  );
}

export default TextField;
