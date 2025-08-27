import { useState, type FormEvent } from "react";
import "../styles.css";

// Asset imports (Vite will bundle these)
import logo from "../assets/images/logo.svg";
import institutionalIcon from "../assets/icons/institutional.svg";
import googleIcon from "../assets/icons/google.svg";
import microsoftIcon from "../assets/icons/microsoft.svg";

type Role = "lead-author" | "co-author" | "reviewer" | "researcher";

const CoAuthorLogin = () => {
  const [role, setRole] = useState<Role>("lead-author");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInstitutionalLogin = () => {
    console.log("Institutional SSO clicked");
  };

  const handleOAuth = (provider: "google" | "microsoft") => {
    console.log(`${provider} OAuth clicked`);
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  const handleCredentialLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate async auth
    setTimeout(() => {
      setLoading(false);
      if (email.trim() && password.trim() && accessCode.trim()) {
        setSuccessMessage("Access granted! Redirecting to your workspace...");
        setErrorMessage("");
      } else {
        setErrorMessage(
          "Access denied. Please check your credentials or contact the project coordinator."
        );
        setSuccessMessage("");
      }
    }, 1200);
  };

  return (
    <div className="login-container">
      <div className="platform-header">
        <div className="logo">
          <img src={logo} alt="SDG Logo" className="logo-img" />
        </div>
        <h1>Policy Co-Author Portal</h1>
        <p className="subtitle">
          Collaborative platform for SDG policy development
        </p>
      </div>

      <div className="platform-info">
        <strong>🎯 Mission:</strong> Collaborative authoring of sustainable
        development policy documents and research papers.
      </div>

      <div className="access-note">
        <strong>Note:</strong> Co-author access is invitation-only. Please
        ensure you have received authorization from your project coordinator.
      </div>

      {/* Status Messages */}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Role Selection */}
      <div className="role-selector">
        <label className="role-label">Select your role:</label>
        <div className="role-buttons">
          <button
            type="button"
            className={`role-btn ${role === "lead-author" ? "active" : ""}`}
            onClick={() => setRole("lead-author")}
          >
            📝 Lead Author
          </button>
          <button
            type="button"
            className={`role-btn ${role === "co-author" ? "active" : ""}`}
            onClick={() => setRole("co-author")}
          >
            👥 Co-Author
          </button>
          <button
            type="button"
            className={`role-btn ${role === "reviewer" ? "active" : ""}`}
            onClick={() => setRole("reviewer")}
          >
            🔍 Reviewer
          </button>
          <button
            type="button"
            className={`role-btn ${role === "researcher" ? "active" : ""}`}
            onClick={() => setRole("researcher")}
          >
            📊 Researcher
          </button>
        </div>
      </div>

      {/* OAuth Authentication Methods */}
      <div className="auth-methods">
        <button
          type="button"
          className="auth-btn institutional"
          onClick={handleInstitutionalLogin}
        >
          <img
            src={institutionalIcon}
            alt="Institution"
            className="auth-icon"
          />
          Institutional Sign-In
        </button>

        <button
          type="button"
          className="auth-btn google"
          onClick={() => handleOAuth("google")}
        >
          <img src={googleIcon} alt="Google" className="auth-icon" />
          Continue with Google Workspace
        </button>

        <button
          type="button"
          className="auth-btn microsoft"
          onClick={() => handleOAuth("microsoft")}
        >
          <img src={microsoftIcon} alt="Microsoft" className="auth-icon" />
          Continue with Microsoft 365
        </button>
      </div>

      <div className="divider">or use authorized credentials</div>

      {/* Login Form */}
      <form className="login-form" onSubmit={handleCredentialLogin}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="your.email@organization.org"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="Enter your secure password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="accessCode">
            Project Access Code
          </label>
          <input
            type="text"
            id="accessCode"
            className="form-input"
            placeholder="Enter 6-digit project code"
            maxLength={6}
            value={accessCode}
            onChange={(e) => setAccessCode(e.currentTarget.value)}
            required
          />
        </div>

        <div className="remember-forgot">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.currentTarget.checked)}
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="forgot-link"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" className="submit-btn" id="submitBtn">
          Access Co-Author Platform
          {loading && (
            <div className="loading" id="loginLoading">
              <div className="spinner"></div>
            </div>
          )}
        </button>
      </form>

      {/* Footer Information */}
      <div className="footer-info">
        <button 
          type="button" 
          className="signup-btn"
          onClick={() => console.log("Sign up clicked")}
        >
          Sign Up
        </button>
        <p style={{ marginTop: 8 }}>
          By signing in, you agree to our{" "}
          <button type="button" onClick={() => console.log("Show Terms")}>
            Terms of Service
          </button>{" "}
          and{" "}
          <button type="button" onClick={() => console.log("Show Privacy")}>
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default CoAuthorLogin;
