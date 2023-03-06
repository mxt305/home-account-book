import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { User } from "@prisma/client";
import React from "react";
import { useTranslation } from "react-i18next";

export type TopBarProp = {
  user?: User;
};

function TopBar({ user }: TopBarProp) {
  const { t } = useTranslation();
  return (
    <AppBar component="nav">
      <Toolbar>
        <Box sx={{ width: 200 }} />
        <Typography variant="h6">{t("appName")}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box> {user ? user.name : "N/A"}</Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
