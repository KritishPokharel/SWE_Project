// src/components/LoginPage.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { auth, loginWithGoogle } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [name, setName] = useState(""); // Added name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();
  const [user, loadingUser, errorUser] = useAuthState(auth);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleAuth = async () => {
    setAuthLoading(true);
    try {
      if (isSignUp) {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Update displayName
        await updateProfile(userCredential.user, {
          displayName: name,
        });
        setSnackbar({
          open: true,
          message: "Account created successfully!",
          severity: "success",
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSnackbar({
          open: true,
          message: "Logged in successfully!",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Authentication error:", error);
      // Provide user-friendly error messages based on error.code
      let errorMessage = "An unexpected error occurred. Please try again.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/user-disabled":
          errorMessage = "User account is disabled.";
          break;
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "Email is already in use.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters.";
          break;
        default:
          errorMessage = error.message;
      }
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
      // Successful login is handled by useAuthState and useEffect
    } catch (error) {
      console.error("Google login error:", error);
      setSnackbar({
        open: true,
        message: "Error logging in with Google. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loadingUser) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (errorUser) {
    return (
      <Typography color="error">Error: {errorUser.message}</Typography>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            padding: "40px",
            borderRadius: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
          elevation={5}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#141e30",
              fontWeight: "bold",
            }}
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Typography>
          {isSignUp && (
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: "20px" }}
            />
          )}
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleAuth}
            disabled={authLoading}
            sx={{
              marginBottom: "10px",
              backgroundColor: "#4caf50",
              "&:hover": { backgroundColor: "#388e3c" },
            }}
          >
            {authLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Login"
            )}
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => setIsSignUp(!isSignUp)}
            sx={{ color: "#141e30", marginBottom: "10px" }}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Button>
          {/* Google Sign-In Button */}
          <Button
            variant="outlined"
            fullWidth
            onClick={handleLoginWithGoogle}
            sx={{
              marginTop: "10px",
              color: "#141e30",
              borderColor: "#141e30",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            Login with Google
          </Button>
        </Paper>
      </Container>
      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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

export default Login;
