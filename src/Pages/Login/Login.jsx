import React from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
import './Login.css'

const Login = () => {
  return (
    <div className="auth">
      <div className="auth-left">
        <div className="auth-logo">Calender</div>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
