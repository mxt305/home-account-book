import { Box, Container } from "@mui/material";
import React, { useMemo } from "react";
import type { ReactNode } from "react";

import useUserAuth from "@/hooks/useUserAuth";

import { sideMenuWidth } from "../commonValue";

import SideMenu from "./SideMenu";
import SideMenuDrawer from "./SideMenuDrawer";
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
              display: { xs: "none", sm: "flex" },
              width: sideMenuWidth,
              height: "100dvh",
              zIndex: 5000,
              boxShadow: 1,
              background: "white",
            }}
          >
            <SideMenu />
          </Box>
          <SideMenuDrawer />
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
