import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../assets/login.png";

export default function SignupPage() {
  const [step, setStep] = useState(1); 
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        setMessage("OTP sent to your email. Please verify.");
        setStep(2);
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

const handleVerifyOtp = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, otp }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "OTP verification failed");
    } else {
      setMessage("Signup successful! Please login.");
      
      navigate("/login");
    }
  } catch (err) {
    setError("Network error");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex w-full md:w-1/2 h-screen">
        <img src={signupImg} alt="Signup Illustration" className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col justify-center w-full md:w-1/2 px-10 h-screen">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

          <div className="flex mb-6">
            <Link
              to="/login"
              className="w-1/2 py-2 text-center rounded-l-lg"
              style={{ backgroundColor: "#e6f0fa", color: "#006a9a" }}
            >
              Login
            </Link>
            <button
              className="w-1/2 py-2 text-white rounded-r-lg"
              style={{ backgroundColor: "#006a9a" }}
            >
              Sign Up
            </button>
          </div>

          
          {step === 1 && (
            <form onSubmit={handleSendOtp}>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg mb-4"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg mb-4"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
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
                {loading ? "Sending OTP..." : "Sign Up"}
              </button>
            </form>
          )}

        
          {step === 2 && (
            <form onSubmit={handleVerifyOtp}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
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
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
