// src/components/AppComponents.test.js

import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, BrowserRouter as Router } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";

import CreateChallenge from "../components/CreateChallenge";
import Leaderboard from "../components/Leaderboard";
import PlayChallenge from "../components/PlayChallenge";
import NotFound from "../components/NotFound";
import Home from "../components/Home";
import HowToPlay from "../components/HowToPlay";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
import { loginWithGoogle, logout } from "../firebase";

// Mock Firebase dependencies
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
}));

jest.mock("react-firebase-hooks/auth", () => ({
  useAuthState: jest.fn(),
}));

jest.mock("../firebase", () => ({
  loginWithGoogle: jest.fn(),
  logout: jest.fn(),
  auth: jest.fn(),
  db: jest.fn(),
}));

// CreateChallenge Component Tests
describe("CreateChallenge Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state when authentication is loading", () => {
    useAuthState.mockReturnValue([null, true, null]);
    render(<CreateChallenge />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state when authentication fails", () => {
    const error = new Error("Auth error");
    useAuthState.mockReturnValue([null, false, error]);
    render(<CreateChallenge />);
    expect(screen.getByText(`Error: ${error.message}`)).toBeInTheDocument();
  });

  test("renders login prompt for unauthenticated users", () => {
    useAuthState.mockReturnValue([null, false, null]);
    render(<CreateChallenge />);
    expect(screen.getByText("Please log in to create a challenge.")).toBeInTheDocument();
  });

  test("renders form for authenticated users", () => {
    useAuthState.mockReturnValue([{ uid: "123", displayName: "Test User" }, false, null]);
    render(<CreateChallenge />);
    expect(screen.getByText("Create Your Challenge")).toBeInTheDocument();
    expect(screen.getByLabelText("Challenge Title")).toBeInTheDocument();
  });
});

// Leaderboard Component Tests
describe("Leaderboard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state and leaderboard title", async () => {
    getDocs.mockResolvedValueOnce({
      docs: [
        { data: () => ({ playerName: "Alice", score: 90 }) },
        { data: () => ({ playerName: "Bob", score: 80 }) },
      ],
    });

    render(<Leaderboard />);
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
  });

  test("displays 'Anonymous' for players without a name", async () => {
    getDocs.mockResolvedValueOnce({
      docs: [
        { data: () => ({ score: 50 }) },
        { data: () => ({ playerName: "Bob", score: 80 }) },
      ],
    });

    render(<Leaderboard />);
    await waitFor(() => {
      expect(screen.getByText("Anonymous")).toBeInTheDocument();
    });
  });
});

// PlayChallenge Component Tests
describe("PlayChallenge Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("allows user to select and play a challenge", async () => {
    useAuthState.mockReturnValue([{ uid: "123", displayName: "Test User" }, false, null]);

    getDocs.mockResolvedValueOnce({
      docs: [
        {
          id: "challenge1",
          data: () => ({
            title: "Challenge 1",
            description: "Test Challenge",
            questions: [
              { question: "Q1?", options: ["A", "B", "C"], correctAnswer: "A" },
            ],
          }),
        },
      ],
    });

    render(<PlayChallenge />);

    await waitFor(() => {
      expect(screen.getByText("Challenge 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Play Challenge"));
    fireEvent.click(screen.getByText("A"));

    await waitFor(() => {
      expect(screen.getByText("Current Score: 10")).toBeInTheDocument();
    });
  });
});

// NotFound Component Tests
describe("NotFound Component", () => {
  test("displays 404 message and home link", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go to home/i })).toHaveAttribute("href", "/");
  });
});

// Home Component Tests
describe("Home Component", () => {
  test("renders logo, title, and buttons", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Challenge Hub Logo")).toBeInTheDocument();
    expect(screen.getByText("Welcome to Howard University Trivia")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /create a challenge/i })).toHaveAttribute("href", "/create");
  });
});

// HowToPlay Component Tests
describe("HowToPlay Component", () => {
  test("renders the title and all steps", () => {
    render(<HowToPlay />);
    expect(screen.getByText("How to Play")).toBeInTheDocument();
    expect(screen.getByText("1. Choose a challenge from the list or create your own challenge.")).toBeInTheDocument();
  });
});

// Navbar Component Tests
describe("Navbar Component", () => {
  test("renders navigation links and handles authentication", () => {
    useAuthState.mockReturnValue([null, false, null]);

    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByText("Howard University Trivia")).toBeInTheDocument();
    expect(screen.getByText("Login with Google")).toBeInTheDocument();
  });
});

// ProtectedRoute Component Tests
describe("ProtectedRoute Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    useAuthState.mockReturnValue([null, true]);

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders children for authenticated user", () => {
    useAuthState.mockReturnValue([{ uid: "123" }, false]);

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
