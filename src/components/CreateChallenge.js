// src/components/CreateChallenge.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Container,
  IconButton,
  CircularProgress, // Imported CircularProgress
} from "@mui/material";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import DeleteIcon from '@mui/icons-material/Delete'; // Ensure DeleteIcon is imported

const CreateChallenge = () => {
  const [user, loading, error] = useAuthState(auth);
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    hint: "",
  });

  if (loading) return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <CircularProgress />
    </Box>
  );
  if (error) return <Typography color="error">Error: {error.message}</Typography>;
  if (!user) return <Typography>Please log in to create a challenge.</Typography>;

  const handleAddQuestion = () => {
    const { question, options, correctAnswer, hint } = currentQuestion;
    if (
      !question.trim() ||
      options.some(opt => !opt.trim()) ||
      !correctAnswer.trim() ||
      !hint.trim()
    ) {
      alert("Please fill in all fields for the question.");
      return;
    }
    if (!options.includes(correctAnswer)) {
      alert("Correct answer must match one of the provided options.");
      return;
    }
    setQuestions(prev => [...prev, currentQuestion]);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      hint: "",
    });
  };

  const handleRemoveQuestion = (indexToRemove) => {
    setQuestions(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (
      !challengeTitle.trim() ||
      !challengeDescription.trim() ||
      questions.length === 0
    ) {
      alert("Please fill in all fields and add at least one question.");
      return;
    }

    try {
      await addDoc(collection(db, "challenges"), {
        title: challengeTitle,
        description: challengeDescription,
        questions,
        createdAt: new Date(),
        creatorId: user.uid,
        creatorName: user.displayName || user.email,
      });
      alert("Challenge created successfully!");
      setChallengeTitle("");
      setChallengeDescription("");
      setQuestions([]);
    } catch (error) {
      console.error("Error creating challenge:", error);
      alert("Error creating challenge. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={5}
          sx={{
            padding: "30px",
            borderRadius: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "20px", color: "#141e30" }}
          >
            Create Your Challenge
          </Typography>
          <TextField
            fullWidth
            label="Challenge Title"
            value={challengeTitle}
            onChange={(e) => setChallengeTitle(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            label="Challenge Description"
            value={challengeDescription}
            onChange={(e) => setChallengeDescription(e.target.value)}
            multiline
            rows={3}
            sx={{ marginBottom: "20px" }}
          />
          <Paper sx={{ padding: "20px", marginBottom: "20px", backgroundColor: "#f0f0f0" }}>
            <Typography variant="h6" gutterBottom>
              Add a Question
            </Typography>
            <TextField
              fullWidth
              label="Question"
              value={currentQuestion.question}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, question: e.target.value })
              }
              sx={{ marginBottom: "10px" }}
            />
            <Grid container spacing={2}>
              {currentQuestion.options.map((option, index) => (
                <Grid item xs={6} key={index}>
                  <TextField
                    fullWidth
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const updatedOptions = [...currentQuestion.options];
                      updatedOptions[index] = e.target.value;
                      setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <TextField
              fullWidth
              label="Correct Answer"
              value={currentQuestion.correctAnswer}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })
              }
              sx={{ marginTop: "10px" }}
            />
            <TextField
              fullWidth
              label="Hint"
              value={currentQuestion.hint}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, hint: e.target.value })}
              sx={{ marginTop: "10px" }}
            />
            <Button
              variant="contained"
              onClick={handleAddQuestion}
              sx={{ marginTop: "15px", backgroundColor: "#4caf50", "&:hover": { backgroundColor: "#388e3c" } }}
            >
              Add Question
            </Button>
          </Paper>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px", color: "#141e30" }}>
            Questions Added
          </Typography>
          {questions.map((q, index) => (
            <Paper key={index} sx={{ padding: "10px", marginBottom: "10px", backgroundColor: "#e8e8e8", position: "relative" }}>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleRemoveQuestion(index)}
                sx={{ position: "absolute", top: 5, right: 5 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <Typography>{index + 1}. {q.question}</Typography>
              <ul>
                {q.options.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
              <Typography>
                <strong>Correct Answer:</strong> {q.correctAnswer}
              </Typography>
              <Typography>
                <strong>Hint:</strong> {q.hint}
              </Typography>
            </Paper>
          ))}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ padding: "10px", marginTop: "20px", fontSize: "18px", backgroundColor: "#007BFF", "&:hover": { backgroundColor: "#0056b3" } }}
          >
            Submit Challenge
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateChallenge;
