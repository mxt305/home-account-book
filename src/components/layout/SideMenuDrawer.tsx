import { Drawer } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/hooks";
import DEF from "@/store/stateDef";

import { sideMenuWidth } from "../commonValue";

import SideMenu from "./SideMenu";

function SideMenuDrawer() {
  const menuOpen = useAppSelector((state) => state.menuOpen);
  const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    dispatch({ type: DEF.MENU_CLOSE });
  };
  return (
    <Drawer
      variant="temporary"
      open={menuOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: sideMenuWidth },
      }}
    >
      <SideMenu />
    </Drawer>
  );
}

export default SideMenuDrawer;
