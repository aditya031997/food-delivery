import React, { useState } from "react";
import { Col, Form, Button, Row, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
// import Header from "./component/Header";
// import FormValidation from "./component/FormValidation";
// import { toast, ToastContainer } from "react-toastify";
export default function Register(prop) {
  const [val, setVal] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });
  // const [formError, setFormError] = useState({});
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setVal({ ...val, [name]: value });
    // setFormError({
    //   ...formError,
    //   [e.target.name]: FormValidation.Registration(e.target.name, e.target.value),
    // });
    //console.log(formError);
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (
  //     formError.name === "" &&
  //     formError.email === "" &&
  //     formError.password === "" &&
  //     formError.contact === "" &&
  //     formError.city === "" &&
  //     formError.state === ""
  //   ) {
  //     fetch("http://localhost:8000/Register", {
  //       method: "Post",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(val),
  //     }).then((reqs) => {
  //       reqs.json().then((result) => {
  //         console.log(result);
  //         // localStorage.setItem("UserEmail", val.email);
  //         // localStorage.setItem("UserPassword", val.password);
  //         // prop.history.push("/login");
  //       });
  //     });
  //     console.log(val);
  //     setVal({});
  //   } else {
  //     toast.error("Input field is required !", {
  //       position: toast.POSITION.TOP_CENTER,
  //       theme: "dark",
  //     });
  //   }
  // }

  return (
    <div>
      {/* <ToastContainer autoClose={4000} limit={3} /> */}
      {/* <Header /> */}
      <Container>
        <Card style={{ padding: 100, margin: 120 }}>
          {/* <Form onSubmit={handleSubmit}> */}
          <Form>
            <h1 style={{ textAlign: "center", color: "blue" }}>Registration Page</h1>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                onChange={handleChange}
              />
              {/* {formError.name && <div style={{ color: "red", fontSize: 14 }}>{formError.name}</div>} */}
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                />
                {/* {formError.email && (
                  <div style={{ color: "red", fontSize: 14 }}>{formError.email}</div>
                )} */}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
                {/* {formError.password && (
                  <div style={{ color: "red", fontSize: 14 }}>{formError.password}</div>
                )} */}
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control placeholder="987654310" name="contact" onChange={handleChange} />
            </Form.Group>
            {/* {formError.contact && (
              <div style={{ color: "red", fontSize: 14 }}>{formError.contact}</div>
            )} */}

            <Button variant="primary" type="submit">
              Register
            </Button>
            <span style={{ margin: "0 20px" }}>Aleady have a account</span>
            {/* <Link to="/login">Login</Link> */}
          </Form>
        </Card>
      </Container>
    </div>
  );
}
