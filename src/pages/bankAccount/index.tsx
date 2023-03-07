import { Typography } from "@mui/material";
import { BankAccount } from "@prisma/client";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

import DataTable from "@/components/DataTable";
import Layout from "@/components/layout/MainLayout";

function BankAccountList() {
  const { data, mutate } = useSWR<BankAccount[]>("api/bankAccount");
  const { t } = useTranslation();
  console.log(data);
  const columnHelper = createColumnHelper<BankAccount>();
  const columns: ColumnDef<BankAccount, any>[] = [
    columnHelper.accessor("id", {
      header: () => "#",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: () => t("field.name"),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("note", {
      header: () => t("field.note"),
      cell: (info) => info.getValue(),
    }),
  ];
  const table = useReactTable<BankAccount>({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        {t("menu.bankAccount")}
      </Typography>
      <DataTable<BankAccount> tableData={table} />
    </>
  );
}

export default BankAccountList;

BankAccountList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
