import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const Register = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();

  // Register method
  const handleRegister = (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("Please, add atleast two uppercase");
      return;
    } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError("Please, add atleast two numbers");
      return;
    } else if (password.length < 6) {
      setError("Password must be more than 6 character");
      return;
    }

    //create user with email methods
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        event.target.reset();
        setSuccess("Registration Successfully!!!");
        sendVerificationEmail(loggedUser);
        updateUserData(loggedUser, name)
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });

    console.log(name, email, password);
  };

  // Verification email method
  const sendVerificationEmail = (user) => {
    console.log("verify");
    sendEmailVerification(user)
      .then((result) => {
        console.log(result);
        alert("Please verify your email address");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserData = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        console.log("User update");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-50 mx-auto mt-5">
      <Card className="p-5">
        <Card.Header className="mb-4">
          <Card.Title>Please Register</Card.Title>
        </Card.Header>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </Form.Group>
          {success ? (
            <p className="bg-success text-white p-2 rounded mt-4">{success}</p>
          ) : (
            ""
          )}
          {error ? (
            <p className="bg-danger text-white p-2 rounded mt-4">{error}</p>
          ) : (
            ""
          )}
          <div className="mt-4 text-center">
            <Button className="px-3" variant="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
