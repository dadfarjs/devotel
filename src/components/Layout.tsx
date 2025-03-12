import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

const Layout = ({ children, mode, setMode }: LayoutProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            align="left"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Insurance Portal
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
            <Link
              to="/new-insurance"
              style={{ color: "white", textDecoration: "none" }}
            >
              New Insurance
            </Link>
            <IconButton
              sx={{ ml: 1 }}
              color="inherit"
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
