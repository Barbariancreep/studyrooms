import React from "react";
import RegisterPage from "./components/RegisterPage";
import "../src/styles.css";

// -----------------------------------------------------------------------------------------------------------------------

function Register() {
  return (
    <div>
      {/* Accessing the Register Page JSX for Rendering the HTML */}
      <RegisterPage />
    </div>
  );
}

// Exporting the JSX component to App.js
export default Register;

// -----------------------------------------------------------------------------------------------------------------------