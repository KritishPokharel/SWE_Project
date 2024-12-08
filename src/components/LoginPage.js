// src/components/LoginPage.js
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { auth, loginWithGoogle } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Authentication error:", error);
      // Provide user-friendly error messages based on error.code
      switch (error.code) {
        case 'auth/invalid-email':
          alert("Invalid email address.");
          break;
        case 'auth/user-disabled':
          alert("User account is disabled.");
          break;
        case 'auth/user-not-found':
          alert("No user found with this email.");
          break;
        case 'auth/wrong-password':
          alert("Incorrect password.");
          break;
        case 'auth/email-already-in-use':
          alert("Email is already in use.");
          break;
        case 'auth/weak-password':
          alert("Password should be at least 6 characters.");
          break;
        default:
          alert("An unexpected error occurred. Please try again.");
      }
    }
  };

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
        <Paper sx={{ padding: "30px", borderRadius: "10px", backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
          <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "20px", color: "#141e30" }}>
            {isSignUp ? "Sign Up" : "Login"}
          </Typography>
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
            sx={{ marginBottom: "10px", backgroundColor: "#4caf50", "&:hover": { backgroundColor: "#388e3c" } }}
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => setIsSignUp(!isSignUp)}
            sx={{ color: "#141e30" }}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Button>
          {/* Google Sign-In Button */}
          <Button
            variant="outlined"
            fullWidth
            onClick={loginWithGoogle}
            sx={{ marginTop: "10px", color: "#141e30", borderColor: "#141e30", "&:hover": { backgroundColor: "#f0f0f0" } }}
          >
            Login with Google
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
