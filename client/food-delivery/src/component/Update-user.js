import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";

function Update({ theUser, onClose }) {
  const id = theUser._id;
  const [data, setData] = useState({ fullName: "", email: "", phone: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    setData(theUser);
  }, []);

  let handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data);
  const editUser = async (e) => {
    e.preventDefault();
    return await Axios.put(`http://localhost:4000/edit-user/${id}`, data, {
      headers: { Authorization: "Bearer " + token },
    }).then((res) => {
      onClose();
      toast.success("user data updated", {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };

  return (
    <div>
      <ToastContainer autoClose={800} />
      <Form onSubmit={editUser}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="fullName" value={data.fullName} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" value={data.email} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone No</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default Update;
