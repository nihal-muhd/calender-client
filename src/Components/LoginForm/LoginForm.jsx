import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../Redux/UserSlice'

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { user} = useSelector((state) => state.user)

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.email === "" || formData.password === "") {
      setError("Please fill the form");
    } else if (
      formData.email.indexOf("@") <= 0 ||
      (formData.email.charAt(formData.email.length - 4) !== "." &&
        formData.email.charAt(formData.email.length - 3) !== ".")
    ) {
      setError("**invalid email format");
    } else if (formData.password.length < 6 || formData.password.length > 15) {
      setError("**password format is wrong");
    } else {
      dispatch(userLogin(formData));
    }
  };
  useEffect(() => {
    if (localStorage.getItem('token') || user) {
        navigate('/')
    }
}, [ user, dispatch])

  return (
    <div>
      <div className="auth-right">
        <form className="infoForm authform" onSubmit={handleSubmit}>
          <h3>Login</h3>

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
          </div>
          {error && (
            <p style={{ color: "red" }} className="error-form">
              {error}
            </p>
          )}
          <div>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span style={{ fontSize: "12px", cursor: "pointer" }}>
                Don't have an account?
              </span>{" "}
            </Link>
          </div>
          <button className="button infoButton" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
