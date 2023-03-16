import { Pagination, Stack } from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type {
  RowData,
  TableOptions,
  SortingState,
} from "@tanstack/react-table";
import React, { useState } from "react";

import DataTable from "./DataTable";

export type CommonDataTableProps<TData extends RowData> = Pick<
  TableOptions<TData>,
  "data" | "columns"
>;

function CommonDataTable<TData extends RowData>(
  props: CommonDataTableProps<TData>
) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable<TData>({
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...props,
  });
  return (
    <Stack spacing={2}>
      <DataTable<TData> tableData={table} />
      <Pagination
        count={table.getPageCount()}
        page={table.getState().pagination.pageIndex + 1}
        onChange={(event, page) => {
          console.log(page);
          table.setPageIndex(page - 1);
        }}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}

export default CommonDataTable;
