// src/components/HowToPlay.js

import React from "react";
import {
  Box,
  Typography,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Link,
} from "@mui/material";
import {
  Login as LoginIcon,
  Create as CreateIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  Star as StarIcon,
  TipsAndUpdates as TipsIcon,
} from "@mui/icons-material";

const HowToPlay = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Container
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          color: "#141e30",
          maxWidth: "900px",
        }}
      >
        <Typography variant="h3" gutterBottom align="center">
          How to Play Howard Trivia
        </Typography>
        <Divider sx={{ marginY: "30px" }} />

        {/* Section 1: Logging In */}
        <Typography variant="h5" gutterBottom>
          1. Getting Started: Logging In
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <LoginIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="a. Access the Howard Trivia Application"
              secondary="Open your preferred web browser and navigate to the Howard Trivia URL."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LoginIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="b. Choose Your Sign-In Method"
              secondary="You can sign in using your Email and Password or opt for Google Sign-In for quicker authentication."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LoginIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="c. Complete the Authentication Process"
              secondary="Enter your credentials and click 'Login' or 'Sign Up' to access your account. If you encounter any issues, refer to the error messages displayed for guidance."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LoginIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="d. Navigate to the Dashboard"
              secondary="Upon successful login, you will be redirected to your personalized dashboard, where you can access all features of Howard Trivia."
            />
          </ListItem>
        </List>

        <Divider sx={{ marginY: "30px" }} />

        {/* Section 2: Creating a Challenge */}
        <Typography variant="h5" gutterBottom>
          2. Creating Your Own Challenge
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CreateIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="a. Access the 'Create Challenge' Section"
              secondary="From your dashboard, click on the 'Create Challenge' button to begin crafting your own Howard University-related challenge."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CreateIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="b. Fill in Challenge Details"
              secondary="Provide a compelling title and a detailed description for your challenge. Ensure that your questions are clear, accurate, and relevant to Howard University."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CreateIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="c. Add Questions"
              secondary="For each challenge, add a series of multiple-choice questions. Each question should have at least two options, with one marked as the correct answer. Optionally, you can include a hint to assist players after incorrect attempts."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CreateIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="d. Review and Publish"
              secondary="Once all details are filled out, review your challenge for accuracy and completeness. Click 'Publish' to make your challenge available to other users. **Note:** Your score will not be counted if you play the challenge you created."
            />
          </ListItem>
        </List>

        <Divider sx={{ marginY: "30px" }} />

        {/* Section 3: Playing a Challenge */}
        <Typography variant="h5" gutterBottom>
          3. Playing a Challenge
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <PlayCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="a. Browse Available Challenges"
              secondary="On your dashboard, explore the list of available Howard Trivia challenges. You can use the search bar to find specific challenges or filter them based on categories."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PlayCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="b. Select a Challenge to Play"
              secondary="Click on the 'Play Challenge' button next to your chosen challenge to start playing. **Important:** Your score will not be counted if you play the same challenge more than once."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PlayCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="c. Answer Questions"
              secondary="Respond to each multiple-choice question. You have two attempts to answer each question correctly."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PlayCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="d. Utilize Hints"
              secondary="After two incorrect attempts on a question, a hint will be provided to help you deduce the correct answer."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PlayCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="e. Complete the Challenge"
              secondary="Upon answering all questions, your total score will be calculated based on correct answers. If it's your first time playing this challenge, your score will be added to the leaderboard."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PlayCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="f. Review Your Performance"
              secondary="After completing the challenge, review your answers and scores. Reflect on areas of strength and opportunities for improvement."
            />
          </ListItem>
        </List>

        <Divider sx={{ marginY: "30px" }} />

        {/* Section 4: Understanding the Scoring System */}
        <Typography variant="h5" gutterBottom>
          4. Understanding the Scoring System
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <StarIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="a. Earning Points"
              secondary="Each correct answer awards you 10 points. The total score for a challenge is the sum of points from all correct answers."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="b. Leaderboard Rankings"
              secondary="Your cumulative scores from all challenges are displayed on the leaderboard. Strive to climb the rankings by participating in more challenges and improving your scores. The user with the highest score will receive exclusive Howard University merchandise!"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="c. Score Eligibility Rules"
              secondary="To maintain fairness:
              
                Your score will not be counted if you play the challenge you created.
                Your score will not be counted if you play the same challenge multiple times.
              "
            />
          </ListItem>
        </List>

        <Divider sx={{ marginY: "30px" }} />

        {/* Section 5: Tips and Best Practices */}
        <Typography variant="h5" gutterBottom>
          5. Tips and Best Practices
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <TipsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="a. Take Your Time"
              secondary="Read each question carefully to increase your chances of selecting the correct answer."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TipsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="b. Use Hints Wisely"
              secondary="Hints are available after two incorrect attempts. Use them strategically to maximize your score."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TipsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="c. Regular Participation"
              secondary="Engage in multiple challenges regularly to improve your knowledge about Howard University and climb the leaderboard."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TipsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="d. Create Engaging Challenges"
              secondary="If you're creating challenges, ensure your questions are clear, varied, and provide a good balance of difficulty to engage players effectively."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TipsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="e. Review Your Performance"
              secondary="After completing a challenge, review your answers to understand areas for improvement."
            />
          </ListItem>
        </List>

        <Divider sx={{ marginY: "30px" }} />

        <Box sx={{ marginTop: "40px", textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Howard Trivia. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HowToPlay;
