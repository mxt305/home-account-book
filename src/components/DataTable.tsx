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
import { flexRender, useReactTable } from "@tanstack/react-table";
import React from "react";

export type DataTableProps<DataRow> = TableProps & {
  tableData: ReturnType<typeof useReactTable<DataRow>>;
};

function DataTable<DataRow>({ tableData, ...props }: DataTableProps<DataRow>) {
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
