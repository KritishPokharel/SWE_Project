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
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { logout, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const { t, i18n } = useTranslation();

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#141e30" }}>
      <Toolbar>
        {/* App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            Howard U Trivia
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
          {t('create_challenge')}
        </Link>
        <Link
          component={RouterLink}
          to="/play"
          color="inherit"
          underline="none"
          sx={{ mx: 2, "&:hover": { color: "#4caf50" } }}
        >
          {t('play_challenges')}
        </Link>
        <Link
          component={RouterLink}
          to="/leaderboard"
          color="inherit"
          underline="none"
          sx={{ mx: 2, "&:hover": { color: "#2196f3" } }}
        >
          {t('leaderboard')}
        </Link>
        <Link
          component={RouterLink}
          to="/how-to-play"
          color="inherit"
          underline="none"
          sx={{ mx: 2, "&:hover": { color: "#ff9800" } }}
        >
          {t('how_to_play')}
        </Link>
        {user && (
          <Link
            component={RouterLink}
            to="/my-challenges"
            color="inherit"
            underline="none"
            sx={{ mx: 2, "&:hover": { color: "#4caf50" } }}
          >
            {t('my_challenges')}
          </Link>
        )}

        {/* Language Selector */}
        <FormControl variant="standard" sx={{ minWidth: 120, mx: 2 }}>
          <InputLabel id="language-selector-label" sx={{ color: "white" }}>
            {t('select_language')}
          </InputLabel>
          <Select
            labelId="language-selector-label"
            id="language-selector"
            value={i18n.language}
            onChange={handleLanguageChange}
            label={t('select_language')}
            sx={{
              color: "white",
              '& .MuiSvgIcon-root': {
                color: "white",
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: "white",
              },
              '& .MuiInput-underline:hover:before': {
                borderBottomColor: "#ff9800",
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: "#ff9800",
              },
            }}
          >
            <MenuItem value="en">{t('language_english')}</MenuItem>
            <MenuItem value="fr">{t('language_french')}</MenuItem>
            <MenuItem value="es">{t('language_spanish')}</MenuItem>
          </Select>
        </FormControl>

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
                {t('logout')}
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
            {t('login')}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
