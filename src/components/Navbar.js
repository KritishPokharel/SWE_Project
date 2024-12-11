// src/components/Navbar.js
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { logout, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#141e30" }}>
      <Toolbar>
        {/* App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            Challenge Hub
          </Link>
        </Typography>

        {/* Navigation Links */}
        <Link
          component={RouterLink}
          to="/create"
          color="inherit"
          underline="none"
          sx={{ mx: 2, "&:hover": { color: "#ff9800" } }}
        >
          Create Challenge
        </Link>
        <Link
          component={RouterLink}
          to="/play"
          color="inherit"
          underline="none"
          sx={{ mx: 2, "&:hover": { color: "#4caf50" } }}
        >
          Play Challenges
        </Link>
        <Link
          component={RouterLink}
          to="/leaderboard"
          color="inherit"
          underline="none"
          sx={{ mx: 2, "&:hover": { color: "#2196f3" } }}
        >
          Leaderboard
        </Link>
        <Link
          component={RouterLink}
          to="/how-to-play"
          color="inherit"
          underline="none"
          sx={{ mx: 2, "&:hover": { color: "#ff9800" } }}
        >
          How to Play
        </Link>
        {user && (
          <Link
            component={RouterLink}
            to="/my-challenges"
            color="inherit"
            underline="none"
            sx={{ mx: 2, "&:hover": { color: "#4caf50" } }}
          >
            My Challenges
          </Link>
        )}

        {/* User Authentication */}
        {user ? (
          <>
            <Button color="inherit" onClick={handleMenu}>
              <Avatar alt={user.displayName} src={user.photoURL} />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem disabled>{user.displayName || user.email}</MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            color="inherit"
            component={RouterLink}
            to="/login"
            sx={{ textTransform: "none" }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
