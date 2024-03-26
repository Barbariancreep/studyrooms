import React from "react";
import LoginPage from "./components/LoginPage";
import "../src/styles.css";

// -----------------------------------------------------------------------------------------------------------------------

function Login({ onLogin }) {

  const bodyStyle = {
    width: '100%',
    height: '100vh',
    background: '-webkit-linear-gradient(25deg, #ffbe0b, #fb5607, #ff006e, #8338ec, #3a86ff)',
    backgroundSize:'cover',
  };

  const containerStyle = {display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }

  return (
    <div style={bodyStyle}>
      <div style={containerStyle}>
      {/* Accessing the Login Page JSX for Rendering the HTML */}
      <LoginPage onLogin={(username) => onLogin(username)} />
      </div>
    </div>
  );
}

// Exporting the JSX component to App.js
export default Login;

// -----------------------------------------------------------------------------------------------------------------------