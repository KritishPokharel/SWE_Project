// src/components/Home.js
import React from "react";
import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ChallengeHubLogo from "../assets/logo.png"; // Ensure the path is correct
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* Logo */}
      <Paper elevation={4} sx={{ padding: "20px", borderRadius: "50%", backgroundColor: "white", marginBottom: "20px" }}>
        <img
          src={ChallengeHubLogo}
          alt="Challenge Hub Logo"
          style={{
            width: "150px",
            borderRadius: "20%",
          }}
        />
      </Paper>

      {/* Title */}
      <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
        {t('welcome')}
      </Typography>

      {/* Subtitle */}
      <Typography variant="h5" gutterBottom>
        {t('create_play_learn')}
      </Typography>

      {/* Buttons */}
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/create"
          sx={{
            padding: "15px 30px",
            fontSize: "18px",
            backgroundColor: "#ff9800",
            "&:hover": {
              backgroundColor: "#e68900",
            },
          }}
        >
          {t('create_challenge')}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/play"
          sx={{
            padding: "15px 30px",
            fontSize: "18px",
            backgroundColor: "#4caf50",
            "&:hover": {
              backgroundColor: "#388e3c",
            },
          }}
        >
          {t('play_challenges')}
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          component={RouterLink}
          to="/how-to-play"
          sx={{
            padding: "15px 30px",
            fontSize: "18px",
            border: "2px solid white",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          {t('how_to_play')}
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
