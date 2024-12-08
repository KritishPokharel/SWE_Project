// src/components/PlayChallenge.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const PlayChallenge = () => {
  // Authentication State
  const [user, loading, error] = useAuthState(auth);

  // Challenges State
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);

  // Current Challenge State
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Scoring State
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0); // To store score before reset

  // Hint State
  const [hintVisible, setHintVisible] = useState(false);

  // Search State
  const [searchTerm, setSearchTerm] = useState("");

  // Challenge Ownership State
  const [isOwnChallenge, setIsOwnChallenge] = useState(false);

  // Dialog States
  const [openOwnChallengeDialog, setOpenOwnChallengeDialog] = useState(false);
  const [openEndDialog, setOpenEndDialog] = useState(false);
  const [openAlreadyPlayedDialog, setOpenAlreadyPlayedDialog] = useState(false);

  // Snackbar State for Notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // 'error', 'warning', 'info', 'success'
  });

  // User Played Challenges State
  const [playedChallenges, setPlayedChallenges] = useState([]);

  // Fetch Challenges on Component Mount or User Change
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "challenges"));
        const challengeList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChallenges(challengeList);
        setFilteredChallenges(challengeList);
      } catch (err) {
        console.error("Error fetching challenges:", err);
        setSnackbar({
          open: true,
          message: "Failed to fetch challenges.",
          severity: "error",
        });
      }
    };

    if (user) {
      fetchChallenges();
    }
  }, [user]);

  // Fetch Played Challenges for the User
  useEffect(() => {
    const fetchPlayedChallenges = async () => {
      try {
        const userPlayedRef = doc(db, "userPlayedChallenges", user.uid);
        const userPlayedSnap = await getDoc(userPlayedRef);
        if (userPlayedSnap.exists()) {
          setPlayedChallenges(userPlayedSnap.data().playedChallenges || []);
        } else {
          setPlayedChallenges([]);
        }
      } catch (err) {
        console.error("Error fetching played challenges:", err);
      }
    };

    if (user) {
      fetchPlayedChallenges();
    }
  }, [user]);

  // Filter Challenges Based on Search Term
  useEffect(() => {
    const filtered = challenges.filter((challenge) =>
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChallenges(filtered);
  }, [searchTerm, challenges]);

  // Handle Challenge Selection
  const handleSelectChallenge = async (challenge) => {
    if (challenge.creatorId === user.uid) {
      // User is playing their own challenge
      setIsOwnChallenge(true);
      setOpenOwnChallengeDialog(true);
      setCurrentChallenge(challenge);
      setCurrentQuestionIndex(0);
      setScore(0);
      setFinalScore(0);
      setHintVisible(false);
    } else {
      if (playedChallenges.includes(challenge.id)) {
        // User has already played this challenge before
        setIsOwnChallenge(false);
        setOpenAlreadyPlayedDialog(true);
        setCurrentChallenge(challenge);
        setCurrentQuestionIndex(0);
        setScore(0);
        setFinalScore(0);
        setHintVisible(false);
      } else {
        // First time playing this challenge
        setIsOwnChallenge(false);
        setOpenAlreadyPlayedDialog(true); // Inform that score won't count this time
        setCurrentChallenge(challenge);
        setCurrentQuestionIndex(0);
        setScore(0);
        setFinalScore(0);
        setHintVisible(false);

        // Update playedChallenges in Firestore
        try {
          const userPlayedRef = doc(db, "userPlayedChallenges", user.uid);
          await updateDoc(userPlayedRef, {
            playedChallenges: arrayUnion(challenge.id),
          });
          setPlayedChallenges([...playedChallenges, challenge.id]);
        } catch (err) {
          console.error("Error updating played challenges:", err);
        }
      }
    }
  };

  // Handle Answer Selection
  const handleAnswer = (selectedOption) => {
    const question = currentChallenge.questions[currentQuestionIndex];
    if (!question.attempts) {
      question.attempts = 0;
    }

    if (selectedOption === question.correctAnswer) {
      const newScore = score + 10; // Each correct answer gives 10 points
      setScore(newScore);
      handleNextQuestion(newScore);
    } else {
      question.attempts += 1;
      if (question.attempts >= 2) {
        setHintVisible(true);
        setSnackbar({
          open: true,
          message: "Incorrect! Here's a hint.",
          severity: "warning",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Incorrect! Try again.",
          severity: "error",
        });
      }
    }
  };

  // Handle Moving to Next Question or Ending Challenge
  const handleNextQuestion = async (currentScore) => {
    if (currentQuestionIndex + 1 < currentChallenge.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setHintVisible(false);
    } else {
      setFinalScore(currentScore); // Store final score before resetting
      setOpenEndDialog(true);
      if (!isOwnChallenge && playedChallenges.includes(currentChallenge.id)) {
        // Update leaderboard only if not own challenge and it's not the first play
        await updateLeaderboard(currentScore);
      }
      // Do not reset the game here; wait until dialog is closed
    }
  };

  // Reset Game State
  const resetGame = () => {
    setCurrentChallenge(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setFinalScore(0);
    setIsOwnChallenge(false);
    setHintVisible(false);
  };

  // Update Leaderboard
  const updateLeaderboard = async (currentScore) => {
    try {
      const leaderboardRef = doc(db, "leaderboard", user.uid);
      const docSnap = await getDoc(leaderboardRef);
      if (docSnap.exists()) {
        await updateDoc(leaderboardRef, {
          score: increment(currentScore),
        });
      } else {
        await setDoc(leaderboardRef, {
          playerName: user.displayName || user.email,
          score: currentScore,
        });
      }
    } catch (err) {
      console.error("Error updating leaderboard:", err);
      setSnackbar({
        open: true,
        message: "Failed to update leaderboard.",
        severity: "error",
      });
    }
  };

  // Handle Snackbar Close
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Handle End Challenge Dialog Close
  const handleCloseEndDialog = () => {
    setOpenEndDialog(false);
    resetGame();
  };

  // Handle Own Challenge Dialog Close
  const handleCloseOwnChallengeDialog = () => {
    setOpenOwnChallengeDialog(false);
  };

  // Handle Already Played Dialog Close
  const handleCloseAlreadyPlayedDialog = () => {
    setOpenAlreadyPlayedDialog(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      {/* Loading State */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      )}

      {/* Unauthenticated State */}
      {!loading && !error && !user && (
        <Typography variant="h6">Please log in to play challenges.</Typography>
      )}

      {/* Main Content */}
      {!loading && !error && user && !currentChallenge && (
        <>
          <Typography variant="h3" gutterBottom sx={{ color: "#ffffff" }}>
            Select a Challenge to Play
          </Typography>

          {/* Search Bar */}
          <TextField
            variant="outlined"
            placeholder="Search challenges..."
            fullWidth
            sx={{
              maxWidth: "600px",
              marginBottom: "20px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Challenges Grid */}
          <Grid container spacing={3} justifyContent="center">
            {filteredChallenges.length > 0 ? (
              filteredChallenges.map((challenge, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      backgroundColor: "#ffffff",
                      color: "#000",
                      borderRadius: "8px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "#141e30" }}
                      >
                        {challenge.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {challenge.description}
                      </Typography>
                    </CardContent>
                    <Box sx={{ padding: "10px" }}>
                      <Button
                        variant="contained"
                        onClick={() => handleSelectChallenge(challenge)}
                        sx={{
                          backgroundColor: "#007BFF",
                          color: "white",
                          width: "100%",
                          "&:hover": {
                            backgroundColor: "#0056b3",
                          },
                        }}
                      >
                        Play Challenge
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h6">No challenges found.</Typography>
            )}
          </Grid>
        </>
      )}

      {/* Challenge Gameplay */}
      {!loading && !error && user && currentChallenge && (
        <>
          {/* Challenge Header */}
          <Card
            sx={{
              maxWidth: "800px",
              width: "100%",
              padding: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              color: "#141e30",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              marginBottom: "20px",
            }}
          >
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {currentChallenge.title}
              </Typography>
              <Typography variant="body1">{currentChallenge.description}</Typography>
            </CardContent>
          </Card>

          {/* Current Question */}
          <Card
            sx={{
              maxWidth: "600px",
              width: "100%",
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#ffffff",
              color: "#141e30",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              marginBottom: "20px",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {currentChallenge.questions[currentQuestionIndex].question}
              </Typography>
              {currentChallenge.questions[currentQuestionIndex].options.map(
                (option, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    onClick={() => handleAnswer(option)}
                    sx={{
                      display: "block",
                      margin: "10px auto",
                      width: "100%",
                      borderColor: "#007BFF",
                      color: "#007BFF",
                      "&:hover": {
                        backgroundColor: "#e7f3ff",
                      },
                    }}
                  >
                    {option}
                  </Button>
                )
              )}
              {hintVisible && (
                <Typography sx={{ marginTop: "20px", color: "#007BFF" }}>
                  Hint: {currentChallenge.questions[currentQuestionIndex].hint}
                </Typography>
              )}
              <Typography variant="subtitle1" sx={{ marginTop: "10px" }}>
                Current Score: {score}
              </Typography>
            </CardContent>
          </Card>
        </>
      )}

      {/* Own Challenge Dialog */}
      <Dialog
        open={openOwnChallengeDialog}
        onClose={handleCloseOwnChallengeDialog}
      >
        <DialogTitle>Playing Your Own Challenge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are playing a challenge you created. Your score in this challenge
            will not be counted towards the leaderboard.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOwnChallengeDialog}>OK</Button>
        </DialogActions>
      </Dialog>

      {/* Already Played Challenge Dialog */}
      <Dialog
        open={openAlreadyPlayedDialog && !isOwnChallenge}
        onClose={handleCloseAlreadyPlayedDialog}
      >
        <DialogTitle>Playing an Already Played Challenge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have already played this challenge before. This time, your score will
            count towards the leaderboard.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlreadyPlayedDialog}>OK</Button>
        </DialogActions>
      </Dialog>

      {/* End Challenge Dialog */}
      <Dialog open={openEndDialog} onClose={handleCloseEndDialog}>
        <DialogTitle>Challenge Complete</DialogTitle>
        <DialogContent>
          <DialogContentText>Your score: {finalScore}</DialogContentText>
          {isOwnChallenge && (
            <DialogContentText>
              Note: Since you played your own challenge, this score does not count
              towards the leaderboard.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEndDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      {snackbar.open && (
        <Dialog
          open={snackbar.open}
          onClose={handleCloseSnackbar}
        >
          <DialogTitle>
            {snackbar.severity === "error"
              ? "Error"
              : snackbar.severity === "warning"
              ? "Warning"
              : "Notification"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{snackbar.message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSnackbar}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default PlayChallenge;
