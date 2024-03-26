import React, { useState } from "react";
import { auth, database, validate_email, validate_password } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { child, ref, update } from "firebase/database";

// -----------------------------------------------------------------------------------------------------------------------

// LoginPage JSX Component
function LoginPage() {

    const [email, getEmail] = useState("");
    const [password, getPassword] = useState("");

    const handleSubmit = e => {
        if (validate_email(email) == false || validate_password(password) == false) {
            alert("Incomplete Fields!!")
            return
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(()  => {

            // Declaring the user
            var user = auth.currentUser

            // Creating the User JSON object for updating the last login
            var user_data = {
                last_login: Date.now()
            }

            // Firebase Database Reference
            var databaseRef = ref(database, "users/")

            // Specific User Reference
            var userRef = child(databaseRef, user.uid)
            update(userRef, user_data)
            .then(() => {
                window.open("/storage", "_self").focus()
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
        // Container for the entire page
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
                        <input type="email" placeholder="Email" id="email" value={email} onChange={(e) => getEmail(e.target.value)} />
                        <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => getPassword(e.target.value)} />

                        {/* Buttons for Login and Register */}
                        <div className="button_container">
                            <button type="submit" onClick={() => handleSubmit()}>
                                <p>Login</p>
                            </button>
                            <button type="submit" onClick={() => window.open("/register", "_self").focus()}>
                                <p>Register Me</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;