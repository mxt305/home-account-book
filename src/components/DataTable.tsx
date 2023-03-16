import { mdiArrowDown, mdiArrowUp } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { TableProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import { flexRender, useReactTable } from "@tanstack/react-table";
import React from "react";
import { useTranslation } from "react-i18next";

export type DataTableProps<DataRow> = TableProps & {
  tableData: ReturnType<typeof useReactTable<DataRow>>;
};

function DataTable<DataRow>({ tableData, ...props }: DataTableProps<DataRow>) {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table {...props}>
        <TableHead>
          {tableData.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  component="th"
                  width={header.getSize()}
                >
                  {header.isPlaceholder ? null : (
                    <Button
                      onClick={header.column.getToggleSortingHandler()}
                      fullWidth
                      sx={{ padding: 0, justifyContent: "flex-start" }}
                      disabled={!header.column.getCanSort()}
                      endIcon={
                        {
                          asc: <Icon path={mdiArrowUp} size={0.8} />,
                          desc: <Icon path={mdiArrowDown} size={0.8} />,
                        }[header.column.getIsSorted() as string] ?? undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Button>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {tableData.getRowModel().rows.map((row) => (
            <TableRow hover key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {tableData.getRowModel().rows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={tableData.getAllColumns().length}
                sx={{ textAlign: "center", color: grey[500] }}
              >
                {t("common.noData")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
