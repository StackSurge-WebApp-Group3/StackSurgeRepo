import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";

import "./App.css";
import theme from "./theme";
import { Router } from "./router/Router";
import { AppBar } from "./components/AppBar";
import { queryClient } from "./services/queryClient";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Stack>
              <AppBar />
              <Router />
            </Stack>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
