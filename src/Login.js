import React from "react";
import LoginPage from "./components/LoginPage";
import "../src/styles.css";

// -----------------------------------------------------------------------------------------------------------------------

function Login({ onLogin }) {
  return (
    <div>
      {/* Accessing the Login Page JSX for Rendering the HTML */}
      <LoginPage onLogin={(username) => onLogin(username)} />
    </div>
  );
}

// Exporting the JSX component to App.js
export default Login;

// -----------------------------------------------------------------------------------------------------------------------