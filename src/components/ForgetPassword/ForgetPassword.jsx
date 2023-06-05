import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import app from "../../firebase/firebase.init";

const ForgetPassword = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef();
  const auth = getAuth(app);

  const handleResetPassword = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please provide your email address to reset password.");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Check your email.");
        setSuccess("Request sent check your email please.");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  return (
    <div className="text-center mt-5">
      <h3 className="text-primary mb-4">Reset your password</h3>
      <form>
        <input
          className="input-style mb-3"
          ref={emailRef}
          type="email"
          name="email"
          placeholder="Please enter your email"
        />
        
        <div>
          <Button onClick={handleResetPassword}>Forget password</Button>
        </div>
        {success ? (
          <p className="w-50 text-center mx-auto bg-success text-white p-2 rounded mt-4">
            {success}
          </p>
        ) : (
          ""
        )}
        {error ? (
          <p className="w-50 mx-auto text-center bg-danger text-white p-2 rounded mt-4">
            {error}
          </p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default ForgetPassword;
