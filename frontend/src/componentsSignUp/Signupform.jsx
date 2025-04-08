import React, { useState } from 'react';
import Errorpopup from '../errorMessage/Errorpopup';
import Successpopup from '../errorMessage/Successpopup';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Signupform() {
  const [error, setError] = useState(false);
  const [errorM, setErrorM] = useState("");
  const [success, setSuccess] = useState(false);
  const [successM, setSuccessM] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);
    setErrorM("");
    setSuccessM("");

    const email = event.target.form[1].value.trim();
    const password = event.target.form[2].value.trim();

    if (!email || !password) {
      setError(true);
      setErrorM("Email and password required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data, response.status);

      if (data.error) {
        setError(true);
        setErrorM(data.error);
      } else {
        Cookies.set("user_email", email, { expires: 1 }); // 1 day expiry
        localStorage.setItem('token', data.token);
        setSuccess(true);
        setSuccessM(data.message || "Login successful!");
        setTimeout(() => navigate("/dashboard"), 500); // Navigate after showing success
        // <Navigate to="/dashboard" replace />
        // navigate("/dashboard")
      }

    } catch (err) {
      setError(true);
      setErrorM("An error occurred. Please try again.");
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);
    setErrorM("");
    setSuccessM("");

    const name = event.target.form[0].value.trim();
    const email = event.target.form[1].value.trim();
    const password = event.target.form[2].value.trim();

    if (!name || !email || !password) {
      setError(true);
      setErrorM("Please fill in all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();
      console.log(data, response.status);

      if (data.error) {
        setError(true);
        setErrorM(data.error);
      } else {
        setSuccess(true);
        setSuccessM(data.message || "Sign up successful!");
      }
    } catch (err) {
      setError(true);
      setErrorM("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white/10 p-8 rounded-xl shadow-xl border border-white/20 backdrop-blur-md max-w-md w-full hover:shadow-white/30 transition-all duration-300">
      <div className="text-center mb-5 bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg">
        <h2 className="text-white text-2xl font-bold">Welcome!!</h2>
      </div>

      <form className="space-y-5">
        <div>
          <label className="text-gray-300 block text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-gray-300 block text-sm font-medium">Email</label>
          <input required
            type="email"
            className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-gray-300 block text-sm font-medium">Password</label>
          <input required
            type="password"
            className="w-full bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            className="w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <button
            type="submit"
            className="w-1/2 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition-all"
            onClick={handleSubmit}
          >
            Log in
          </button>
        </div>
      </form>

      {error && <Errorpopup message={errorM} onClose={() => setError(false)} />}
      {success && <Successpopup message={successM} onClose={() => setSuccess(false)} />}
    </div>
  );
}

export default Signupform;