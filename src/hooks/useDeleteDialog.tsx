import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { memo, useState } from "react";
import { useTranslation } from "next-i18next";

import useCUD from "./useCUD";

export interface DeleteDialogConfig {
  apiPath: string;
  onDeleted?: () => void;
}

function useDeleteDialog({ apiPath, onDeleted }: DeleteDialogConfig) {
  const [idToDelete, setIdToDelete] = useState<number | string | undefined>(
    undefined
  );
  const handleClose = () => {
    setIdToDelete(undefined);
  };
  const { handleDelete } = useCUD();
  const deleteData = async () => {
    if (idToDelete) {
      return await handleDelete(`${apiPath}/${idToDelete}`).then(() => {
        onDeleted && onDeleted();
        handleClose();
      });
    }
  };
  const DeleteDialog = memo(function DeleteDialog() {
    const { t } = useTranslation();
    return (
      <Dialog
        maxWidth="sm"
        fullWidth
        open={!!idToDelete}
        onClose={handleClose}
        aria-labelledby="delete-alert-dialog-title"
        aria-describedby="delete-alert-dialog-description"
      >
        <DialogTitle id="delete-alert-dialog-title">
          {t("common:del")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-alert-dialog-description">
            {t("message:delCheck", { data: `(id=${idToDelete})` })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteData();
            }}
          >
            {t("common:del")}
          </Button>
          <Button onClick={handleClose}>{t("common:cancel")}</Button>
        </DialogActions>
      </Dialog>
    );
  });

  return { DeleteDialog, setIdToDelete };
}

export default useDeleteDialog;
