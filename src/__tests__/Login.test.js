import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react"; // Import act from React
import Login from "../components/LoginPage";
import { loginWithGoogle } from "../firebase";

// Mock Firebase authentication methods
jest.mock("firebase/auth", () => {
  const actual = jest.requireActual("firebase/auth");
  return {
    ...actual,
    getAuth: jest.fn(() => ({ mockAuth: true })), // Mock `auth` object
    signInWithEmailAndPassword: jest.fn(), // Mock Firebase login function
  };
});

// Mock `loginWithGoogle` from firebase.js
jest.mock("../firebase", () => ({
  loginWithGoogle: jest.fn(),
}));

// Mock global alert
global.alert = jest.fn();

describe("LoginPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  test("renders login button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeInTheDocument();
  });

  test("handles Google Sign-In", async () => {
    loginWithGoogle.mockResolvedValue({ email: "testuser@gmail.com" });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const googleLoginButton = screen.getByRole("button", { name: "Login with Google" });

    // Simulate Google login
    await act(async () => {
      fireEvent.click(googleLoginButton);
    });

    expect(loginWithGoogle).toHaveBeenCalledTimes(1);
  });
});
