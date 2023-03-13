import { mdiDelete, mdiPencil } from "@mdi/js";
import { Icon } from "@mdi/react";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import type { CellContext } from "@tanstack/react-table";
import React from "react";
import { useTranslation } from "react-i18next";

export interface TableRowControlProps<RowData> {
  cellContext: CellContext<RowData, any>;
  editable?: boolean;
  deletable?: boolean;
  onEdit?: (rowData: RowData) => void;
  onDelete?: (rowData: RowData) => void;
}

function TableRowControl<RowData>({
  cellContext,
  editable = true,
  deletable = true,
  onEdit,
  onDelete,
}: TableRowControlProps<RowData>) {
  const { t } = useTranslation();
  const row = cellContext.row.original;
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Tooltip title={t("common.edit")}>
        <IconButton
          size="small"
          color="primary"
          disabled={!editable}
          onClick={() => {
            onEdit && onEdit(row);
          }}
          aria-label="edit"
        >
          <Icon path={mdiPencil} size={1} />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("common.del")}>
        <IconButton
          size="small"
          color="error"
          disabled={!deletable}
          onClick={() => {
            onDelete && onDelete(row);
          }}
          aria-label="delete"
        >
          <Icon path={mdiDelete} size={1} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default TableRowControl;
