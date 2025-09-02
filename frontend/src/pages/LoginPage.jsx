import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import loginImg from "../assets/login.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("login"); 
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

 
  const handleSendOtp = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), 
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to send OTP");
      } else {
        setMessage("OTP sent to your email");
        setStep("verifyOtp");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

 
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Reset failed");
      } else {
        setMessage("Password reset successful! Please login.");
        setStep("login");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex w-full md:w-1/2 h-screen">
        <img
          src={loginImg}
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center w-full md:w-1/2 px-10 h-screen">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold mb-6 text-center">Welcome back</h2>

          <div className="flex mb-6">
            <button
              className="w-1/2 py-2 text-white rounded-l-lg"
              style={{ backgroundColor: "#006a9a" }}
            >
              Login
            </button>
            <Link
              to="/signup"
              className="w-1/2 py-2 text-center rounded-r-lg"
              style={{ backgroundColor: "#e6f0fa", color: "#006a9a" }}
            >
              Sign Up
            </Link>
          </div>

        
          {step === "login" && (
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg mb-4"
                required
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg mb-4"
                required
              />

              {error && <div className="text-red-600 mb-2">{error}</div>}
              {message && <div className="text-green-600 mb-2">{message}</div>}

              <button
                type="submit"
                className="w-full py-2 rounded-lg text-white"
                style={{ backgroundColor: "#006a9a" }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p
                onClick={handleSendOtp}
                className="text-sm mt-3 text-right cursor-pointer"
                style={{ color: "#006a9a" }}
              >
                Forgot Password?
              </p>
            </form>
          )}

         
          {step === "verifyOtp" && (
            <form onSubmit={handleResetPassword}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg mb-4"
                required
              />
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg mb-4"
                required
              />

              {error && <div className="text-red-600 mb-2">{error}</div>}
              {message && <div className="text-green-600 mb-2">{message}</div>}

              <button
                type="submit"
                className="w-full py-2 rounded-lg text-white"
                style={{ backgroundColor: "#006a9a" }}
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
