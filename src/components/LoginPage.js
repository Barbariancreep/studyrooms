import React, { useState } from "react";
import { auth, database, validate_email, validate_password } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { child, ref, update } from "firebase/database";

// -----------------------------------------------------------------------------------------------------------------------

// LoginPage JSX Component
function LoginPage({ onLogin }) {
    
    // State variables to keep track of the input from the user for Login Page
    const [email, getEmail] = useState("");
    const [password, getPassword] = useState("");

    // State method to access and process the inputs from the user for the Login Page
    const handleSubmit = e => {
        if (validate_email(email) == false || validate_password(password) == false) {
            alert("Incomplete Fields!!")
            return
        }

        // Moving on with Authentication for the user with Email and Password to Login
        signInWithEmailAndPassword(auth, email, password)
        .then(()  => {

            // Declaring the user object to parse the existing user
            var user = auth.currentUser

            // Creating the User JSON object for updating the last login
            var user_data = {
                last_login: Date.now()
            }

            // Trigger onLogin to allow user access on App.js
            onLogin(user.email.split('@')[0]); // username is the part of the email before the @

            // Firebase Database Reference
            var databaseRef = ref(database, "users/")

            // Specific User Reference
            var userRef = child(databaseRef, user.uid)

            // Updating the Last Login for the current user
            update(userRef, user_data)
            .then(() => {
                //window.open("/storage", "_self").focus()
            })
            .catch(function(error) {
                // Firebase will use this to alert of its errors
                var error_code = error.code
                var error_message = error.message
            
                alert(error_message)
            })
        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message
        
            alert(error_message)
        })
    }

    return (
        <div className="content_container">
            {/* Container for the form */}
            <div className="form_container">
            {/* Header of the form */}
                <div className="form_header_container">
                    <h2 className="form_header">User Login</h2>
                </div>

                {/* Body of the form */}
                <div className="form_body_container">
                    {/* Input fields of the Form for Login */}
                    <div className="form_content_container">
                        <input type="email" placeholder="Email" id="email" value={email} onChange={(e) => getEmail(e.target.value)} class="input_field"/>
                        <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => getPassword(e.target.value)} class="input_field"/>

                        {/* Buttons for Login and Register */}
                        <div className="button_container">
                            <button type="submit" onClick={() => handleSubmit()}>
                                <p>Sign In</p>
                            </button>
                            <button type="submit" onClick={() => window.open("/register", "_self").focus()}>
                                <p>Sign Up</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Exporting the JSX component to the Login.js
export default LoginPage;

// -----------------------------------------------------------------------------------------------------------------------