import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Noto Sans TC",
      "-apple-system",
      '"Segoe UI"',
      "Roboto",
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontWeight: "bold",
    },
    h2: {
      fontWeight: "bold",
    },
    h3: {
      fontWeight: "bold",
    },
    h4: {
      fontWeight: "bold",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 8,
        },
        head: {
          fontWeight: "bold",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
        },
      },
    },
  },
});

export default theme;
