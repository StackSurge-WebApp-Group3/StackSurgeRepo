import { MouseEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import MUIAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";

import type { AppRoute } from "../router/routes";
import {
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  EVENTS_ROUTE,
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

  const { mutate: logout, isLoading: isLogoutLoading } = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      setUser(null);
      localStorage.removeItem("token");
      navigate(AppPath.Home);
    },
  });

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    navigate(AppPath.Profile);
    handleCloseUserMenu();
  };

  const handleLogoutClick = () => {
    logout();
    handleCloseUserMenu();
  };

  const availableRoutes = user
    ? [EVENTS_ROUTE, ...PUBLIC_ROUTES.filter((route) => route.path !== AppPath.Home)]
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
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open user menu">
                <IconButton
                  onClick={handleOpenUserMenu}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleProfileClick}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogoutClick} disabled={isLogoutLoading}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
}
