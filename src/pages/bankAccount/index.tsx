import { Box, Typography } from "@mui/material";
import { BankAccount } from "@prisma/client";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import React, { ChangeEvent, ReactElement, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

import { FunctionButton, SearchTextField } from "@/components/common";
import DataTable from "@/components/DataTable";
import Layout from "@/components/layout/MainLayout";
import TableRowControl from "@/components/TableRowControl";

import BankAccountFormDialog from "./_formDialog";

function BankAccountList() {
  const { data, mutate } = useSWR<BankAccount[]>("api/bankAccount");
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [formOpen, setFormOpen] = React.useState(false);
  const [currentDataId, setCurrentDataId] = useState<number | undefined>(
    undefined
  );
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
    {
      id: "row-control",
      header: "",
      cell: (info) => (
        <TableRowControl<BankAccount>
          cellContext={info}
          onEdit={(rowData) => {
            setCurrentDataId(rowData.id);
            setFormOpen(true);
          }}
        />
      ),
    },
  ];
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const mData = useMemo(() => {
    if (!data || !searchText || searchText === "") {
      return data || [];
    }
    return data.filter((row) => row.name.includes(searchText));
  }, [searchText, data]);
  const table = useReactTable<BankAccount>({
    data: mData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        {t("menu.bankAccount")}
      </Typography>
      <Box
        mb={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SearchTextField onChange={handleSearchChange} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FunctionButton
            type="add"
            onClick={() => {
              setCurrentDataId(undefined);
              setFormOpen(true);
            }}
          />
        </Box>
      </Box>
      <DataTable<BankAccount> tableData={table} />
      <BankAccountFormDialog
        dataId={currentDataId}
        onDataChange={() => {
          mutate();
        }}
        onClose={() => {
          setFormOpen(false);
        }}
        open={formOpen}
      />
    </>
  );
}

export default BankAccountList;

BankAccountList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
