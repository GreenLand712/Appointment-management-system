import React, { useState } from "react";
import {Form} from 'react-bootstrap'
import { Button, Message, NavLink } from "react-bootstrap";
import "./Login.css";
import { Navigate } from 'react-router';
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState('');
  function validateForm() {
    return email.length > 0 && password.length > 8;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleLogin(e) {
    e.preventDefault();
    axios.post('http://127.0.0.1/appointment/login', {
      email: e.target.elements.email.value,
      pwd: e.target.elements.password.value,
    })
      .then(res => setToken(res.key))
      .catch(err => alert(err.error))
  }
  if (token) {
    return <Navigate to="/client" />;
  }
  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group><br />
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br /><br />
        <Button block size="lg" type="submit" disabled={!validateForm()} onSubmit={handleLogin}>
          Login
        </Button>
      </Form>
      <p>
        New to us? <NavLink to="/signup">Sign Up</NavLink>
      </p>
    </div>
  );
}
export default Login