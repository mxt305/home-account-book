import { mdiLogout } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";

import useLogout from "@/hooks/useLogout";

import { menuData } from "../commonValue";

function SideMenu() {
  const logout = useLogout();
  const { t } = useTranslation();
  return (
    <List sx={{ width: "100%" }}>
      {menuData.map((item, i) => (
        <ListItem disablePadding key={i}>
          <ListItemButton
            onClick={() => {
              if (item.path) {
                Router.push(item.path);
              }
            }}
          >
            {item.icon && (
              <ListItemIcon>
                <Icon path={item.icon} size={1} />
              </ListItemIcon>
            )}
            <ListItemText primary={t(`menu:${item.name}`)} />
          </ListItemButton>
        </ListItem>
      ))}
      <Divider />
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            logout();
          }}
        >
          <ListItemIcon>
            <Icon path={mdiLogout} size={1} />
          </ListItemIcon>
          <ListItemText primary={t("common:logout")} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default SideMenu;
