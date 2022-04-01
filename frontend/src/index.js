import "core-js/stable";
import "regenerator-runtime/runtime";
import App from "./App";
import React from "react";
import { render } from "react-dom";
import theme from "./globalTheme";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

// auth context related import
import { QueryClient, QueryClientProvider } from "react-query";
import { StateProvider } from "./contextAuth/StateProvider";
import reducer, { initialState } from "./contextAuth/reducer";

// alert related imports
import { SnackbarProvider } from "material-ui-snackbar-provider";
import SnackbarAlert from "./components/other/SnackbarAlert";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

render(
  <StyledEngineProvider injectFirst>
    {/* overriding global styles */}
    <ThemeProvider theme={theme}>
      {/* alerts */}
      <SnackbarProvider
        SnackbarProps={{ autoHideDuration: 4000 }}
        SnackbarComponent={SnackbarAlert}
      >
        {/* context data */}
        <StateProvider initialState={initialState} reducer={reducer}>
          {/* React query */}
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </StateProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById("app")
);
