import {
  mdiCancel,
  mdiContentSave,
  mdiDelete,
  mdiPencil,
  mdiPlus,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export type FunctionButtonType = "add" | "edit" | "delete" | "save" | "cancel";

export type FunctionButtonProps = Omit<ButtonProps, "type" | "startIcon"> & {
  type: FunctionButtonType;
};

type FunctionButtonData = Partial<ButtonProps> & {
  icon?: string;
  text?: string;
};

const buttonMapping: Record<FunctionButtonType, FunctionButtonData> = {
  add: {
    text: "common.add",
    icon: mdiPlus,
  },
  edit: {
    text: "common.edit",
    icon: mdiPencil,
  },
  delete: {
    text: "common.del",
    icon: mdiDelete,
  },
  save: {
    text: "common.save",
    icon: mdiContentSave,
  },
  cancel: {
    text: "common.cancel",
    icon: mdiCancel,
  },
};

function FunctionButton({ type, ...props }: FunctionButtonProps) {
  const defaultProps = buttonMapping[type];
  const { t } = useTranslation();
  const { icon, text, ...restProps } = defaultProps;
  return (
    <Button
      variant="contained"
      {...restProps}
      startIcon={icon && <Icon path={icon} size={1} />}
      {...props}
    >
      {text && t(text)}
    </Button>
  );
}

export default FunctionButton;
