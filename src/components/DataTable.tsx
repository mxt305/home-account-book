import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type { TableProps } from "@mui/material";
import { flexRender, useReactTable } from "@tanstack/react-table";
import React from "react";

export type DataTableProps = TableProps & {
  tableData: ReturnType<typeof useReactTable>;
};

function DataTable({ tableData, ...props }: DataTableProps) {
  return (
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
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataTable;
