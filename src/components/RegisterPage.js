import React, {useState} from "react";
import { auth, database, validate_email, validate_password, validate_field } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {child, ref, set } from "firebase/database";

// -----------------------------------------------------------------------------------------------------------------------

// RegisterPage JSX Component
function RegisterPage() {

    // State variables to keep track of all the inputs from the user for the Register Page
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // State method to access and process the inputs from the user for the Register Page
    const handleSubmit = e => {
        // console.log(firstName);
        // console.log(lastName);
        // console.log(email);
        // console.log(password);

        // Validating the Input from the user
        if (validate_email(email) == false || validate_password(password) == false || validate_field(firstName) == false || validate_field(lastName) == false) {
            alert("Incomplete Fields!!!!")
            return
        }

        // Moving on with Authentication to create a user using email and password
        createUserWithEmailAndPassword(auth, email, password)
        .then(function() {

            // Declaring a unique user object for the new user
            var user = auth.currentUser
        
            // Data corresponding to the new user
            var user_data = {
            email : email,
            firstName : firstName,
            lastName : lastName,
            last_login : Date.now()
            }
        
            // Firebase Database Reference
            var databaseRef = ref(database, 'users/')

            // Specific User Reference
            var userRef = child(databaseRef, user.uid)

            // Commiting the Data from the new user into the database
            set(userRef, user_data)
            .then(() => {
                
                // Done
                alert('User Created!!')

                // Rerouting to the Login Page
                window.open("/", "_self").focus();
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
                    <h2 className="form_header">Register User</h2>
                </div>

                {/* Body of the form */}
                <div className="form_body_container">
                    {/* Input fields of the Form for Login */}
                    <div className="form_content_container">
                        <input type="text" placeholder="First Name" id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} class="input_field"/>
                        <input type="text" placeholder="Last Name" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} class="input_field"/>
                        <input type="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} class="input_field"/>
                        <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} class="input_field"/>

                        {/* Buttons for Login and Register */}
                        <div className="button_container">
                            <button type="submit" onClick={() => window.open("/", "_self").focus()}>
                                <p>Sign In</p>
                            </button>
                            <button type="submit" onClick={() => handleSubmit()}>
                                <p>Sign Up</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Exporting the JSX component to Register.js
export default RegisterPage;

// -----------------------------------------------------------------------------------------------------------------------