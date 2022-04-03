import { createTheme } from "@mui/material";
const theme = createTheme({
  typography: {
    fontFamily: "Quicksand, sans-serif",
  },
  components: {
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffeddb14",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
  },
});

export default theme;
