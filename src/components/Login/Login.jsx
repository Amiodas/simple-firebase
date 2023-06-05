import React, { useState } from "react";
import "./Login.css";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        setUser(loggedInUser);
        console.log(loggedInUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((res) => {
        const loggedInUser = res.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSignOutBtn = () => {
    console.log("btn closed");
    signOut(auth)
      .then((response) => {
        console.log(response);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEmailInput = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };
  const handlePasswordInput = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setSuccess("User login successful");
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="w-50 mt-3 mx-auto text-center text-white">
      {user ? (
        <div>
          <Button variant="primary" onClick={handleSignOutBtn}>
            Sign out
          </Button>
          <div>
            <h4>user: {user?.displayName}</h4>
            <p>User email: {user?.email}</p>
            <img src={user?.photoURL} alt="" />
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <Button
            variant="primary"
            className="me-2"
            onClick={handleGoogleSignIn}
          >
            Google Login
          </Button>
          <Button variant="outline-success" onClick={handleGithubSignIn}>
            Github Login
          </Button>
        </div>
      )}
      <div>
        <h3 className="mb-3">Please Sign in!</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className="input-style mb-3"
                onBlur={handleEmailInput}
                type="email"
                name="email"
                placeholder="Please enter your email"
              />
            </div>
            <div>
              <input
                className="input-style"
                onBlur={handlePasswordInput}
                type="password"
                name="password"
                placeholder="Please enter your email"
              />
            </div>
            {success ? (
              <p className="text-center mx-auto bg-success text-white p-2 rounded mt-4">
                {success}
              </p>
            ) : (
              ""
            )}
            {error ? (
              <p className="text-center bg-danger text-white p-2 rounded mt-4">
                {error}
              </p>
            ) : (
              ""
            )}
            <div className="mt-4 mb-4">
              <Button type="submit">Sign in with email</Button>
            </div>
            <p>
              <small>
                <Link to="/forget_password" className="btn btn-link">
                  Forget password?
                </Link>
              </small>
            </p>
            <p>
              New to this website? <Link to="/register">Please Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
