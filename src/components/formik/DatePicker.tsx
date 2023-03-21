import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import type { DatePickerProps as MuiDatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import type { FormikProps } from "formik";
import React, { useCallback } from "react";

export type DatePickerProps = Omit<
  MuiDatePickerProps<Dayjs>,
  "onChange" | "value"
> & {
  id?: string;
  fullWidth?: boolean;
  formik: FormikProps<any>;
  name: string;
};

function DatePicker({
  id,
  fullWidth,
  name,
  formik,
  ...props
}: DatePickerProps) {
  const value = formik.values[name as keyof typeof formik.values];
  const errors = formik.errors[name as any];
  const handleChange = (value: Dayjs | null) => {
    formik.setFieldValue(name, value);
  };
  return (
    <MuiDatePicker<Dayjs>
      {...props}
      value={value}
      onChange={handleChange}
      format="YYYY-MM-DD"
      slotProps={{
        textField: {
          id,
          fullWidth,
          name: name,
          error: !!errors,
          helperText: errors ? (errors as any) : "",
        },
      }}
    />
  );
}

export default DatePicker;
