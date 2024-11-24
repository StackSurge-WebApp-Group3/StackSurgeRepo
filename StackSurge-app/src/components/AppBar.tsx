import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import MUIAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";

import type { AppRoute } from "../router/routes";
import {
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  AppPath,
} from "../router/routes";
import { useAuth } from "../context/AuthContext";
import { signOut } from "../services/auth";

function AppBarLink({ title, path }: AppRoute) {
  const { pathname } = useLocation();
  const isActive = pathname === path;

  return (
    // @ts-expect-error - the "to" prop is inherited from the router Link
    <Button
      sx={{
        color: isActive ? "var(--variant-containedColor)" : "white",
        display: "flex",
      }}
      LinkComponent={Link}
      to={path}
      variant={isActive ? "contained" : "text"}
      color="primary"
    >
      {title}
    </Button>
  );
}

export function AppBar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      setUser(null);
      localStorage.removeItem("token");
      navigate(AppPath.Home);
    },
  });

  const availableRoutes = user
    ? [...PUBLIC_ROUTES, ...PRIVATE_ROUTES]
    : [...PUBLIC_ROUTES, ...AUTH_ROUTES];

  return (
    <MUIAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1, gap: 2, display: "flex" }}>
            {availableRoutes.map((route) => (
              <AppBarLink key={route.title} {...route} />
            ))}
          </Box>
          {user && (
            <Tooltip title="Logout" placement="left">
              <IconButton onClick={() => logout()} disabled={isLoading}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
}
