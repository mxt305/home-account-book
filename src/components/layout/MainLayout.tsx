import { Box, Container, Toolbar } from "@mui/material";
import { GetStaticProps } from "next";
import { ScriptProps } from "next/script";
import React, { useMemo } from "react";
import type { ReactNode } from "react";

import useUserAuth from "@/hooks/useUserAuth";
import { getI18nProps } from "@/lib/getStatic";

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
              position: "fixed",
              top: 0,
              width: sideMenuWidth,
              height: "100dvh",
              zIndex: 1200,
              boxShadow: 1,
              background: "white",
            }}
          >
            <SideMenu />
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: sideMenuWidth,
            }}
          />
          <Box />
          <Box component="main" sx={{ display: "flex", flexGrow: 1 }}>
            <Container maxWidth="lg">
              <Toolbar sx={{ mb: 2 }} />
              {children}
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Layout;
