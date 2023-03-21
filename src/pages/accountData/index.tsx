import { Box, Typography } from "@mui/material";
import { AccountData } from "@prisma/client";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { GetStaticProps } from "next";
import { ScriptProps } from "next/script";
import { useTranslation } from "next-i18next";
import React, { ChangeEvent, ReactElement, useMemo, useState } from "react";
import useSWR from "swr";

import { FunctionButton, SearchTextField } from "@/components/common";
import CommonDataTable from "@/components/CommonDataTable";
import Layout from "@/components/layout/MainLayout";
import TableRowControl from "@/components/TableRowControl";
import { useDeleteDialog } from "@/hooks";
import { getI18nProps } from "@/lib/getStatic";

import AccountDataFormDialog from "./_formDialog";

const API_PATH = "api/accountData";

function AccountDataList() {
  const { data, mutate } = useSWR<AccountData[]>(API_PATH);
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [formOpen, setFormOpen] = React.useState(false);
  const [currentDataId, setCurrentDataId] = useState<number | undefined>(
    undefined
  );
  const columnHelper = createColumnHelper<AccountData>();
  const { DeleteDialog, setIdToDelete } = useDeleteDialog({
    apiPath: API_PATH,
    onDeleted: () => {
      mutate();
    },
  });

  const columns: ColumnDef<AccountData, any>[] = [
    columnHelper.accessor("id", {
      header: () => "#",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("date", {
      header: () => t("field:date"),
      cell: (info) => {
        const value = info.getValue();
        return value ? dayjs(value).format("YYYY-MM-DD") : "-";
      },
    }),

    columnHelper.accessor("summary", {
      header: () => t("field:summary"),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
      header: () => t("field:amount"),
      cell: (info) => info.getValue(),
    }),
    {
      id: "row-control",
      header: "",
      cell: (info) => {
        const row = info.row.original;
        return (
          <TableRowControl<AccountData>
            cellContext={info}
            onEdit={(rowData) => {
              setCurrentDataId(rowData.id);
              setFormOpen(true);
            }}
            onDelete={(rowData) => {
              setIdToDelete(rowData.id);
            }}
          />
        );
      },
    },
  ];
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const mData = useMemo(() => {
    if (!data || !searchText || searchText === "") {
      return data || [];
    }
    return data.filter(
      (row) =>
        (row.summary && row.summary.includes(searchText)) ||
        row.summary.includes(searchText)
    );
  }, [searchText, data]);

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        {t("menu:accountData")}
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
      <AccountDataFormDialog
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

export default AccountDataList;

AccountDataList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<ScriptProps> = async ({ locale }) =>
  getI18nProps(locale, ["common", "field", "menu", "message", "accountData"]);
