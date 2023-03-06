import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

import { useAppSelector } from "@/hooks";

function LoadingBackdrop() {
  const loadingData = useAppSelector((state) => state.loading);
  const hasLoading = loadingData.length > 0;
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={hasLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default LoadingBackdrop;
