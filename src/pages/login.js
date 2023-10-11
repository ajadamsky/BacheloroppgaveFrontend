import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../functions/authentication";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../styling/login.css";


function LoginDisplay({ verifyLogin }) {
  const {onLogin} = UseAuth();
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form
      className="form-login"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          className="form-item form-label"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className="form-item form-label"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button
        onClick={() => onLogin(email)}
        variant="primary"
        type="submit"
        className="form-item form-button"
      >
        Login
      </Button>
      {invalidLogin ? <p>Invalid login</p> : ""}
    </Form>
  );
}


export default function Login() {
  const [display, setDisplay] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const Navigate = useNavigate();

  const verifyLogin = (email, password) => {
    localStorage.setItem("username", email);
    Navigate("/");
  };
  const handleClose = () => setShowRegister(false);
  const handleShow = () => setShowRegister(true);

  return (
    <div className="container-login">
      <div className="title">
        <h2>Login page</h2>
      </div>
      <div className="div-form">
        <LoginDisplay verifyLogin={verifyLogin} />
      </div>
    </div>
  );
}
