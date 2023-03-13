import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { InputAdornment, TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

function SearchTextField(props: TextFieldProps) {
  const { t } = useTranslation();
  return (
    <TextField
      variant="standard"
      id="input-search"
      label={t("common.search")}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon path={mdiMagnify} size={1} />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}

export default SearchTextField;
