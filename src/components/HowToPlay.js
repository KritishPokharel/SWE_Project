// src/components/HowToPlay.js
import React from "react";
import { Box, Typography, Container, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          color: "#141e30",
          maxWidth: "700px",
        }}
      >
        <Typography variant="h3" gutterBottom>
          How to Play
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="1. Choose a challenge from the list or create your own challenge."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="2. Answer questions in the challenge to earn points."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="3. You get two attempts for each question; a hint will be shown after the second attempt."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="4. Complete the challenge and check your score on the leaderboard."
            />
          </ListItem>
        </List>
      </Container>
    </Box>
  );
};

export default HowToPlay;
