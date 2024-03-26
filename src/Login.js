import React from "react";
import LoginPage from "./components/LoginPage";
import "../src/styles.css";

// -----------------------------------------------------------------------------------------------------------------------

function Login() {
  return (
    <div>
      {/* Accessing the Login Page JSX for Rendering the HTML */}
      <LoginPage />
    </div>
  );
}

// Exporting the JSX component to App.js
export default Login;

// -----------------------------------------------------------------------------------------------------------------------