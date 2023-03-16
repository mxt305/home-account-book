import { Box, Typography } from "@mui/material";
import { Member } from "@prisma/client";
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
import CommonDataFormDialog from "@/components/CommonDataFormDialog";
import CommonDataTable from "@/components/CommonDataTable";
import Layout from "@/components/layout/MainLayout";
import TableRowControl from "@/components/TableRowControl";
import { useDeleteDialog } from "@/hooks";

const API_PATH = "api/member";

function MemberList() {
  const { data, mutate } = useSWR<Member[]>(API_PATH);
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [formOpen, setFormOpen] = React.useState(false);
  const [currentDataId, setCurrentDataId] = useState<number | undefined>(
    undefined
  );
  const columnHelper = createColumnHelper<Member>();
  const { DeleteDialog, setIdToDelete } = useDeleteDialog({
    apiPath: API_PATH,
    onDeleted: () => {
      mutate();
    },
  });
  const columns: ColumnDef<Member, any>[] = [
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
        <TableRowControl<Member>
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
  const table = useReactTable<Member>({
    data: mData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        {t("menu.member")}
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

export default MemberList;

MemberList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
