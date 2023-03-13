import { mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { User } from "@prisma/client";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/hooks";
import DEF from "@/store/stateDef";

import { sideMenuWidth } from "../commonValue";

export type TopBarProp = {
  user?: User;
};

function TopBar({ user }: TopBarProp) {
  const { t } = useTranslation();
  const menuOpen = useAppSelector((state) => state.menuOpen);
  const dispatch = useDispatch();
  const handleMenuButton = () => {
    dispatch({ type: menuOpen ? DEF.MENU_CLOSE : DEF.MENU_OPEN });
  };

  return (
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleMenuButton}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <Icon path={mdiMenu} size={1} />
        </IconButton>
        <Box sx={{ width: { xs: 0, md: sideMenuWidth } }} />
        <Typography variant="h6">{t("appName")}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box> {user ? user.name : "N/A"}</Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
