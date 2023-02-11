import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Config/axios";
import { toast } from "react-hot-toast";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const { name, email, mobile, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setError("");
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    /* Signup validation */
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      setError("**please fill the form");
    } else if (
      (formData.name.length <= 2 && formData.name.length > 20) ||
      !formData.name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)
    ) {
      setError("Invalid name");
    } else if (
      formData.email.indexOf("@") <= 0 ||
      (formData.email.charAt(formData.email.length - 4) !== "." &&
        formData.email.charAt(formData.email.length - 3) !== ".")
    ) {
      setError("**invalid email format");
    } else if (formData.password.length < 6 || formData.password.length > 15) {
      setError("**password length should be between 6 and 15");
    } else if (formData.password !== formData.confirmPassword) {
      setError("**password doesnt match");
    } else {
      const data = await axios.post("/signup", formData);
      if (data.status === 201) {
        toast.success("Registration successfull");
        navigate("/login");
      } else {
        toast.error("Registration Failed");
      }
    }
  };
  return (
    <div className="auth-right">
      <form className="infoForm authform" onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <div>
          <input
            type="text"
            placeholder="Full name"
            className="infoInput"
            name="name"
            onChange={handleChange}
            value={name}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="infoInput"
            name="email"
            onChange={handleChange}
            value={email}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="infoInput"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="infoInput"
            name="confirmPassword"
            onChange={handleChange}
            value={confirmPassword}
          />
        </div>
        {error && (
          <p style={{ color: "red" }} className="error-form">
            {error}
          </p>
        )}
        <div>
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {" "}
            <span style={{ fontSize: "12px" }}>Already have account?</span>
          </Link>
        </div>
        <button className="button infoButton" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
