// src/components/MyChallenges.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const MyChallenges = () => {
  const [user, loading, error] = useAuthState(auth);
  const [myChallenges, setMyChallenges] = useState([]);
  const [loadingChallenges, setLoadingChallenges] = useState(true);
  const [challengeToDelete, setChallengeToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Fetch Challenges Created by the User
  useEffect(() => {
    const fetchMyChallenges = async () => {
      try {
        const challengesRef = collection(db, "challenges");
        const q = query(challengesRef, where("creatorId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const challenges = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyChallenges(challenges);
      } catch (err) {
        console.error("Error fetching user's challenges:", err);
        setSnackbar({
          open: true,
          message: "Failed to fetch your challenges.",
          severity: "error",
        });
      } finally {
        setLoadingChallenges(false);
      }
    };

    if (user) {
      fetchMyChallenges();
    }
  }, [user]);

  // Handle Delete Button Click
  const handleDeleteClick = (challenge) => {
    setChallengeToDelete(challenge);
    setOpenDeleteDialog(true);
  };

  // Confirm Deletion
  const handleConfirmDelete = async () => {
    if (challengeToDelete) {
      try {
        await deleteDoc(doc(db, "challenges", challengeToDelete.id));
        setMyChallenges(myChallenges.filter((c) => c.id !== challengeToDelete.id));
        setSnackbar({
          open: true,
          message: "Challenge deleted successfully.",
          severity: "success",
        });
      } catch (err) {
        console.error("Error deleting challenge:", err);
        setSnackbar({
          open: true,
          message: "Failed to delete challenge.",
          severity: "error",
        });
      } finally {
        setChallengeToDelete(null);
        setOpenDeleteDialog(false);
      }
    }
  };

  // Cancel Deletion
  const handleCancelDelete = () => {
    setChallengeToDelete(null);
    setOpenDeleteDialog(false);
  };

  // Handle Snackbar Close
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loadingChallenges) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#141e30",
          color: "white",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error.message}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center", color: "#ffffff" }}>
        My Created Challenges
      </Typography>

      {myChallenges.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {myChallenges.map((challenge, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#000",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.02)" },
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
                <Box sx={{ padding: "10px", textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(challenge)}
                    sx={{
                      borderColor: "#d32f2f",
                      color: "#d32f2f",
                      "&:hover": {
                        backgroundColor: "#ffebee",
                        borderColor: "#c62828",
                      },
                    }}
                  >
                    Delete Challenge
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px" }}>
          You haven't created any challenges yet.
        </Typography>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Delete Challenge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the challenge "{challengeToDelete?.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyChallenges;
