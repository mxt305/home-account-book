import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import type { SelectProps as MuiSelectProps } from "@mui/material";
import type { FormikProps } from "formik";
import { useTranslation } from "next-i18next";
import React, { ReactNode } from "react";

export interface SelectionItem {
  text: ReactNode;
  value: number | string;
}

export type SelectProps = MuiSelectProps & {
  formik: FormikProps<any>;
  items: SelectionItem[];
  name: string;
  nullable?: boolean;
};

function Select({
  formik,
  items,
  id,
  name,
  label,
  labelId,
  fullWidth,
  nullable = false,
  ...props
}: SelectProps) {
  const { t } = useTranslation();
  const mLabelId = labelId ?? `${name}-select-label`;
  const value = formik.values[name as keyof typeof formik.values];
  const errors = formik.errors[name as any];
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id={mLabelId}>{label}</InputLabel>
      <MuiSelect
        {...props}
        value={value || ""}
        fullWidth={fullWidth}
        id={id}
        name={name}
        label={label}
        labelId={mLabelId}
        error={!!errors}
        onChange={formik.handleChange}
      >
        {nullable && (
          <MenuItem value="">
            <em>{t("common:noSelect")}</em>
          </MenuItem>
        )}
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </MuiSelect>
      {errors ? <FormHelperText error>{errors as any}</FormHelperText> : <></>}
    </FormControl>
  );
}

export default Select;
