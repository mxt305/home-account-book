import { Box, Container, Toolbar } from "@mui/material";
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
          <TopBar user={mUser} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: sideMenuWidth,
              height: "100dvh",
              zIndex: 1200,
              boxShadow: 1,
              background: "white",
            }}
          >
            <SideMenu />
          </Box>
          <SideMenuDrawer />
          <Box component="main" sx={{ display: "flex", flexGrow: 1 }}>
            <Container maxWidth="lg">
              <Toolbar sx={{ mb: 1 }} />
              {children}
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Layout;
