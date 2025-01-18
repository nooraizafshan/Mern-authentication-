import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // Import Axios

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  axios.defaults.withCredentials= true;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    // Send a request to the server to authenticate the user
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((res) => {
        if(res.data.Status === "success") {
          if(res.data.role==='Admin')
          {
            navigate("/Dashboard"); // Redirect to dashboard after login completes

          }
          else{
            navigate('/')
          }
        }
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to log in. Please try again.");
      });

    console.log("Submitting form");
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#6c757d" }}
    >
      <div
        className="bg-white p-4 rounded shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              autoComplete="off"
              name="email"
              id="email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              autoComplete="off"
              name="password"
              id="password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
          <div className="text-center mt-3">
            <p>Don't have an account?</p>
            <Link to="/register" className="btn btn-primary w-100">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
