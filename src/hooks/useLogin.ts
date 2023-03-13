import axios from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import useLoading from "./useLoading";
import useUserAuth from "./useUserAuth";

export type LoginFormValues = {
  username: string;
  password: string;
};

function useLogin() {
  const { mutateUser } = useUserAuth();
  const { t } = useTranslation();
  const { addLoading, removeLoading } = useLoading();
  const login = useCallback(
    (loginValues: LoginFormValues) => {
      addLoading();
      axios
        .post("/api/auth/login", loginValues)
        .then(() => {
          toast.success(
            t("message.successMsgTempl", { action: t("common.login") })
          );
          mutateUser();
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            toast.error(error.response.data);
          }
        })
        .finally(() => {
          removeLoading();
        });
    },
    [addLoading, mutateUser, removeLoading, t]
  );

  return login;
}

export default useLogin;
