import { Box, Container } from "@mui/material";
import React, { useMemo } from "react";
import type { ReactNode } from "react";

import useUserAuth from "@/hooks/useUserAuth";

import SideMenu from "./SideMenu";
import TopBar from "./TopBar";

function Layout({ children }: { children: ReactNode }) {
  const { user } = useUserAuth({ redirectTo: "/login" });
  const mUser = useMemo(() => {
    if (!user || typeof user === "string") {
      return undefined;
    }
    return user;
  }, [user]);
  return (
    <>
      {mUser && (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              display: "flex",
              width: "200px",
              height: "100dvh",
              zIndex: 5000,
              boxShadow: 1,
              background: "white",
            }}
          >
            <SideMenu />
          </Box>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <TopBar user={mUser} />
            <Container maxWidth="lg">{children}</Container>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Layout;
