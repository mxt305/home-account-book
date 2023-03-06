import { User } from "@prisma/client";
import axios from "axios";
import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export type UserAuthProps = {
  redirectTo?: string;
  redirectIfFound?: boolean;
};

const fetcher = (url: string) => axios(url).then((res) => res.data);

function useUserAuth({
  redirectTo = "",
  redirectIfFound = false,
}: UserAuthProps = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User | string>(
    "/api/auth/check",
    fetcher
  );

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;
    const userNotFound = !user || typeof user === "string";
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && userNotFound) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && !userNotFound)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}

export default useUserAuth;
