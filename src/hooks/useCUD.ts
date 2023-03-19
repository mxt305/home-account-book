import axios from "axios";
import { useTranslation } from "next-i18next";
import toast from "react-hot-toast";

import useLoading from "./useLoading";

function useCUD() {
  const { t } = useTranslation();
  const { addLoading, removeLoading } = useLoading();

  const handleCreate = async (
    urlPath: string,
    formValue: any,
    actionName = "message:create"
  ) => {
    addLoading();
    return await axios
      .post(urlPath, formValue)
      .then(() => {
        toast.success(t("message:successMsgTempl", { action: t(actionName) }));
      })
      .catch((error) => {
        console.log(error);
        let msg = t("message:faildMsgTempl", { action: t(actionName) });
        if (error.response) {
          msg = `${msg} (${error.response.data})`;
        }
        toast.error(msg);
      })
      .finally(() => {
        removeLoading();
      });
  };

  const handleUpdate = async (
    urlPath: string,
    formValue: any,
    actionName = "message:update"
  ) => {
    addLoading();
    return await axios
      .put(urlPath, formValue)
      .then(() => {
        toast.success(t("message:successMsgTempl", { action: t(actionName) }));
      })
      .catch((error) => {
        console.log(error);
        let msg = t("message:faildMsgTempl", { action: t(actionName) });
        if (error.response) {
          msg = `${msg} (${error.response.data})`;
        }
        toast.error(msg);
      })
      .finally(() => {
        removeLoading();
      });
  };

  const handleDelete = async (urlPath: string, actionName = "message:del") => {
    addLoading();
    return await axios
      .delete(urlPath)
      .then(() => {
        toast.success(t("message:successMsgTempl", { action: t(actionName) }));
      })
      .catch((error) => {
        console.log(error);
        let msg = t("message:faildMsgTempl", { action: t(actionName) });
        if (error.response) {
          msg = `${msg} (${error.response.data})`;
        }
        toast.error(msg);
      })
      .finally(() => {
        removeLoading();
      });
  };

  return { handleCreate, handleUpdate, handleDelete };
}

export default useCUD;
