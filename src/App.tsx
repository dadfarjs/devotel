import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import FormTabs from "./components/FormTabs";
import HomeList from "./components/HomeList";
import Layout from "./components/Layout";
import { store } from "./store";

const queryClient = new QueryClient();

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router>
            <Layout mode={mode} setMode={setMode}>
              <Routes>
                <Route path="/" element={<HomeList />} />
                <Route path="/new-insurance" element={<FormTabs />} />
              </Routes>
            </Layout>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
