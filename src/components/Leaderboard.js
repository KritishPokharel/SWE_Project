// src/components/Leaderboard.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "leaderboard"));
        const scores = querySnapshot.docs.map((doc) => doc.data());
        scores.sort((a, b) => b.score - a.score); // Sort by highest score
        setLeaderboard(scores);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", color: "#141e30" }}
        >
          Leaderboard
        </Typography>
        {loading ? (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
            Loading...
          </Typography>
        ) : leaderboard.length > 0 ? (
          <TableContainer component={Paper} sx={{ borderRadius: "10px", marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    Rank
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    Player Name
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    Score
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{entry.playerName || "Anonymous"}</TableCell>
                    <TableCell align="right">{entry.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px" }}>
            No scores yet.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Leaderboard;
