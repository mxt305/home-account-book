import {
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
                <TableCell key={header.id} component="th">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
