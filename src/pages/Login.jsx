import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    alert("Login successful");

    resetForm();

    navigate("/home");
  };

  return (
    <>
      <CssBaseline />

      <Container maxWidth="sm">
        <Box className="auth-wrapper">
          <Box className="auth-card">
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              <Form autoComplete="off">
                <div className="form-group">
                  <label>Username</label>
                  <Field
                    name="username"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter your Name"
                  />
                  <ErrorMessage
                    name="username"
                    component="small"
                    className="error-text"
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <Field
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Enter your Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="small"
                    className="error-text"
                  />
                </div>

                <button type="submit" className="auth-btn">
                  Login
                </button>

                <p className="bottom-text">
                  Don't have an account? <a href="/signup">Signup</a>
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
