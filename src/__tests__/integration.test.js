import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import Leaderboard from "../components/Leaderboard";
import PlayChallenge from "../components/PlayChallenge";
import NotFound from "../components/NotFound";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs } from "firebase/firestore";

// Mock dependencies
jest.mock("react-firebase-hooks/auth", () => ({
  useAuthState: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

jest.mock("../firebase", () => ({
  auth: jest.fn(),
}));

describe("App Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Navbar and navigates between pages", () => {
    useAuthState.mockReturnValue([null, false, null]);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Verify Navbar links
    expect(screen.getByText("Challenge Hub")).toBeInTheDocument();
    expect(screen.getByText("Create Challenge")).toBeInTheDocument();
    expect(screen.getByText("Play Challenges")).toBeInTheDocument();
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
    expect(screen.getByText("How to Play")).toBeInTheDocument();
  });

  test("ProtectedRoute restricts access when unauthenticated", () => {
    useAuthState.mockReturnValue([null, false, null]);

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Verify redirect to login
    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  test("Leaderboard fetches and displays player data", async () => {
    getDocs.mockResolvedValueOnce({
      docs: [
        { data: () => ({ playerName: "Alice", score: 90 }) },
        { data: () => ({ playerName: "Bob", score: 80 }) },
      ],
    });

    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>
    );

    // Verify leaderboard title
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();

    // Wait for player data
    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
  });

  test("PlayChallenge handles gameplay flow correctly", async () => {
    useAuthState.mockReturnValue([{ uid: "123", displayName: "Test User" }, false, null]);

    getDocs.mockResolvedValueOnce({
      docs: [
        {
          id: "challenge1",
          data: () => ({
            title: "Challenge 1",
            description: "Test Challenge",
            questions: [
              {
                question: "Q1?",
                options: ["A", "B", "C"],
                correctAnswer: "A",
                hint: "Try A",
              },
            ],
          }),
        },
      ],
    });

    render(
      <MemoryRouter>
        <PlayChallenge />
      </MemoryRouter>
    );

    // Wait for challenges to load
    await waitFor(() => {
      expect(screen.getByText("Challenge 1")).toBeInTheDocument();
    });

    // Start the challenge
    fireEvent.click(screen.getByText("Play Challenge"));

    // Verify question and options
    await waitFor(() => {
      expect(screen.getByText("Q1?")).toBeInTheDocument();
      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("B")).toBeInTheDocument();
    });

    // Answer question
    fireEvent.click(screen.getByText("A"));

    // Verify score update
    await waitFor(() => {
      expect(screen.getByText("Current Score: 10")).toBeInTheDocument();
    });
  });

  test("NotFound component renders for undefined routes", () => {
    render(
      <MemoryRouter initialEntries={["/undefined-route"]}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify 404 content
    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("Oops! The page you are looking for does not exist.")
    ).toBeInTheDocument();
  });
});
