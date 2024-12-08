// src/components/HowToPlay.js
import React from "react";
import { Box, Typography, Container } from "@mui/material";

const HowToPlay = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        color: "white",
      }}
    >
      <Container
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          color: "#141e30",
          maxWidth: "600px",
        }}
      >
        <Typography variant="h3" gutterBottom>
          How to Play
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          1. Choose a challenge from the list or create your own challenge.
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          2. Answer questions in the challenge to earn points.
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          3. You get two attempts for each question; a hint will be shown after the second attempt.
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          4. Complete the challenge and check your score on the leaderboard.
        </Typography>
      </Container>
    </Box>
  );
};

export default HowToPlay;
