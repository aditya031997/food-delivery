import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Route, Redirect } from "react-router";
import { Form, Button, Container, Card } from "react-bootstrap";

const Login = (prop) => {
  const [data, setData] = useState({ email: "", password: "" });
  // let token = localStorage.getItem("token");
  let name, value;
  function handleChange(e) {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/login", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((req) => {
      req.json().then((result) => {
        console.log(result.token);
        localStorage.setItem("token", result.token);
        prop.history.push("/home");
      });
    });
  };
  // if (!token) {
  //   return <Redirect to="/login" />;
  // }
  return (
    <div>
      <Container>
        <Card style={{ padding: 130, margin: 160 }}>
          <Form onSubmit={handleSubmit}>
            <h1 style={{ textAlign: "center", color: "blue" }}>Login Page</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <span style={{ margin: "0 20px" }}>New User</span>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
