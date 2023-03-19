import { Box, Typography } from "@mui/material";
import { User } from "@prisma/client";
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

import { getTypeName } from "./_commonValue";
import UserFormDialog from "./_formDialog";

const API_PATH = "api/user";

function UserList() {
  const { data, mutate } = useSWR<User[]>(API_PATH);
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [formOpen, setFormOpen] = React.useState(false);
  const [currentDataId, setCurrentDataId] = useState<string | undefined>(
    undefined
  );
  const columnHelper = createColumnHelper<User>();
  const { DeleteDialog, setIdToDelete } = useDeleteDialog({
    apiPath: API_PATH,
    onDeleted: () => {
      mutate();
    },
  });
  const userTypeData = t("user:types", { returnObjects: true }) as Record<
    string,
    string
  >;
  const columns: ColumnDef<User, any>[] = [
    columnHelper.accessor("name", {
      header: () => t("field:name"),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("type", {
      header: () => t("field:type"),
      cell: (info) => {
        const value = info.getValue();
        return getTypeName(t, value);
      },
    }),
    columnHelper.accessor("username", {
      header: () => t("field:username"),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      header: () => t("field:createdAt"),
      cell: (info) => {
        const value = info.getValue();
        return value ? dayjs(value).format("YYYY-MM-DD") : "-";
      },
    }),
    {
      id: "row-control",
      header: "",
      cell: (info) => {
        const row = info.row.original;
        return (
          <TableRowControl<User>
            cellContext={info}
            onEdit={(rowData) => {
              setCurrentDataId(rowData.id);
              setFormOpen(true);
            }}
            onDelete={(rowData) => {
              setIdToDelete(rowData.id);
            }}
            deletable={row.username !== "admin"}
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
        (row.name && row.name.includes(searchText)) ||
        row.username.includes(searchText)
    );
  }, [searchText, data]);

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        {t("menu:user")}
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
      <UserFormDialog
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

export default UserList;

UserList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<ScriptProps> = async ({ locale }) =>
  getI18nProps(locale, ["common", "field", "menu", "message", "user"]);
