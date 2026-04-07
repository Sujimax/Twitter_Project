import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";

// Material UI Imports (As per old code)
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import "./Auth.css"; // Assuming old CSS file exists

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  // Old Validations (Restored from your original code)
  const validationSchema = Yup.object({
    username: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        "Enter valid Gmail address (@gmail.com required)"
      )
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .max(16, "Maximum 16 characters")
      .matches(/[A-Z]/, "Must contain at least 1 uppercase letter")
      .matches(/[a-z]/, "Must contain at least 1 lowercase letter")
      .matches(/[0-9]/, "Must contain at least 1 number")
      .matches(/[!@#$%^&*]/, "Must contain at least 1 special character")
      .required("Password is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.username, password: values.password }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(loginSuccess({
          token: data.token,
          user: data.user || { email: values.username }
        }));
        navigate("/home");
        resetForm();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Login failed");
      }
    } catch (error) {
      alert("Error connecting to server. Make sure backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />

      <Container maxWidth="sm">
        <Box className="auth-wrapper" marginTop="100px">
          <Box className="auth-card" sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 1 }}>
            <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
              Login to X
            </h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              <Form autoComplete="off">
                {/* EMAIL */}
                <div className="form-group mb-4">
                  <label>Email</label>
                  <Field
                    name="username"
                    type="email"
                    autoComplete="off"
                    placeholder="Enter your Email"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="username"
                    component="small"
                    className="text-red-500 text-xs mt-1 block"
                  />
                </div>

                {/* PASSWORD */}
                <div className="form-group mb-8">
                  <label>Password</label>
                  <Field
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Enter your Password"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="password"
                    component="small"
                    className="text-red-500 text-xs mt-1 block"
                  />
                </div>

                {/* BUTTON */}
                <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-200">
                  {loading ? "Logging in..." : "Login"}
                </button>

                {/* SIGNUP LINK */}
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                  Don't have an account? <Link to="/signup" style={{ color: '#1da1f2', fontWeight: 'bold' }}>Signup</Link>
                </p>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;