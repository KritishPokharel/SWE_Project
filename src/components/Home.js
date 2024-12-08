// src/components/Home.js
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ChallengeHubLogo from "../assets/logo.jpeg"; // Ensure the path is correct

const Home = () => {
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
      <img
        src={ChallengeHubLogo}
        alt="Challenge Hub Logo"
        style={{
          width: "150px",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
      />

      {/* Title */}
      <Typography variant="h2" gutterBottom>
        Welcome to Challenge Hub
      </Typography>

      {/* Subtitle */}
      <Typography variant="h5" gutterBottom>
        Create, Play, and Conquer Challenges in a Gamified Learning Experience!
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
          Create a Challenge
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
          Play Challenges
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
          How to Play
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
