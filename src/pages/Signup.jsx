import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";

// Material UI Imports 
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// import "./Auth.css"; 
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    fullname: "",
    mobilenumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // form Validations 
  const validationSchema = Yup.object({
    fullname: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only Alphabets allowed")
      .min(3, "Minimum 3 characters")
      .required("Name is required"),

    mobilenumber: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter valid 10 digit mobile number")
      .required("Mobile number is required"),

    email: Yup.string()
      .matches(/[A-Za-z0-9._%+-]+@gmail\.com$/, "Email should be correct format (only @gmail.com allowed)")
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .matches(/[A-Z]/, "Password must contain atleast one upper case")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[a-z]/, "Password must contain at least one lower case")
      .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    // REMOVE confirmPassword before sending to the database!
    const { confirmPassword, ...dataToSubmit } = values;

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dataToSubmit, role: "user" }),
      });

      if (response.ok) {
        alert("Signup Successful! Now please login.");
        resetForm();
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Signup failed");
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
        <Box className="auth-wrapper" marginTop="30px">
          <Box className="auth-card" sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 1 }}>
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

                <div className="form-group mb-4">
                  <label>Full Name</label>
                  <Field
                    name="fullname"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter your Name"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  />
                  <ErrorMessage name="fullname" component="small" className="text-red-500 text-xs mt-1 block" />
                </div>

                <div className="form-group mb-4">
                  <label>Mobile Number</label>
                  <Field
                    name="mobilenumber"
                    type="text"
                    maxLength="10"
                    autoComplete="off"
                    placeholder="Enter your Mobile Number"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  />
                  <ErrorMessage name="mobilenumber" component="small" className="text-red-500 text-xs mt-1 block" />
                </div>

                <div className="form-group mb-4">
                  <label>Email</label>
                  <Field
                    name="email"
                    type="email"
                    autoComplete="new-email"
                    placeholder="Enter your Email"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  />
                  <ErrorMessage name="email" component="small" className="text-red-500 text-xs mt-1 block" />
                </div>

                <div className="form-group mb-4">
                  <label>Password</label>
                  <Field
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Enter your Password"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  />
                  <ErrorMessage name="password" component="small" className="text-red-500 text-xs mt-1 block" />
                </div>

                <div className="form-group mb-8">
                  <label>Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your Password"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  />
                  <ErrorMessage name="confirmPassword" component="small" className="text-red-500 text-xs mt-1 block" />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-200">
                  {loading ? "Creating Account..." : "Signup"}  
                </button>

                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                  Already have an account? <Link to="/login" style={{ color: '#1da1f2', fontWeight: 'bold' }}>Login</Link>
                </p>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Signup;
