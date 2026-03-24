import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"; 
import "./Auth.css";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function Signup (){
  const navigate = useNavigate();

  const initialValues = {
    fullname:"",
    mobilenumber:"",
    email:"",
    password:"",
  };

  const validationSchema = Yup.object({
    fullname: Yup.string()
    .min(3, "Minimum 3 characters")
    .required("Name is required"),

    mobilenumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter valid 10 digit mobile number")
    .required("Mobile number is required"),

    email: Yup.string()
    .email("Invalid email format").required("Email is required"),

    password : Yup.string()
    .min(6, "Minimum 6 characters")
      .required("Password is required")
  });

  const onSubmit = (values, {resetForm}) =>{
    console.log(values);
    alert("Signup Successful");

    resetForm();

    navigate("/");
  };

  return (
    <>
       <CssBaseline />

      <Container maxWidth="sm">
        <Box className="auth-wrapper">
          <Box className="auth-card">
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Create your account
            </h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              <Form autoComplete="off">
                <div className="form-group">
                  <label>Full Name</label>
                  <Field
                    name="fullname"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter your Name"
                  />
                  <ErrorMessage
                    name="fullname"
                    component="small"
                    className="error-text"
                  />
                </div>

                <div className="form-group">
                  <label>Mobile Number</label>
                  <Field
                    name="mobilenumber"
                    type="text"
                    maxLength="10"
                    autoComplete="off"
                    placeholder="Enter your Mobile Number"
                  />
                  <ErrorMessage
                    name="mobilenumber"
                    component="small"
                    className="error-text"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <Field
                    name="email"
                    type="email"
                    autoComplete="off"
                    placeholder="Enter your Email"
                  />
                  <ErrorMessage
                    name="email"
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
                  Signup
                </button>

                <p className="bottom-text">
                  Already have an account? <a href="/">Login</a>
                </p>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Signup