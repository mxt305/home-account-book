import axios from "axios";
import Router from "next/router";
import { useCallback } from "react";
import toast from "react-hot-toast";
import useLoading from "./useLoading";

import useUserAuth from "./useUserAuth";

function useLogout() {
  const { mutateUser } = useUserAuth();
  const { addLoading, removeLoading } = useLoading();
  const logout = useCallback(() => {
    addLoading();
    axios
      .get("/api/auth/logout")
      .then(() => {
        toast.success("登出成功");
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
  }, [addLoading, mutateUser, removeLoading]);

  return logout;
}

export default useLogout;
