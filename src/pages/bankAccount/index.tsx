import { Box, Typography } from "@mui/material";
import { BankAccount } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { GetStaticProps } from "next";
import { ScriptProps } from "next/script";
import { useTranslation } from "next-i18next";
import React, { ChangeEvent, ReactElement, useMemo, useState } from "react";
import useSWR from "swr";

import { FunctionButton, SearchTextField } from "@/components/common";
import CommonDataFormDialog from "@/components/CommonDataFormDialog";
import CommonDataTable from "@/components/CommonDataTable";
import Layout from "@/components/layout/MainLayout";
import TableRowControl from "@/components/TableRowControl";
import { useDeleteDialog } from "@/hooks";
import { getI18nProps } from "@/lib/getStatic";

const API_PATH = "api/bankAccount";

function BankAccountList() {
  const { data, mutate } = useSWR<BankAccount[]>(API_PATH);
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [formOpen, setFormOpen] = React.useState(false);
  const [currentDataId, setCurrentDataId] = useState<number | undefined>(
    undefined
  );
  const columnHelper = createColumnHelper<BankAccount>();
  const { DeleteDialog, setIdToDelete } = useDeleteDialog({
    apiPath: API_PATH,
    onDeleted: () => {
      mutate();
    },
  });
  const columns: ColumnDef<BankAccount, any>[] = [
    columnHelper.accessor("id", {
      header: () => "#",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: () => t("field:name"),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("note", {
      header: () => t("field:note"),
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
          onDelete={(rowData) => {
            setIdToDelete(rowData.id);
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

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        {t("menu:bankAccount")}
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
      <CommonDataTable data={mData} columns={columns} />
      <CommonDataFormDialog
        apiPath={API_PATH}
        dataId={currentDataId}
        onDataChange={() => {
          mutate();
        }}
        onClose={() => {
          setFormOpen(false);
        }}
        open={formOpen}
      />
      <DeleteDialog />
    </>
  );
}

export default BankAccountList;

BankAccountList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<ScriptProps> = async ({ locale }) =>
  getI18nProps(locale, ["common", "field", "menu", "message"]);
