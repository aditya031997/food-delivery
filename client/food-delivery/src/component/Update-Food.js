import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";

function UpdateFood({ theUser, onClose }) {
  const id = theUser._id;
  const [data, setData] = useState({ foodName: "", foodPrice: "", avtar: "", foodType: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    setData(theUser);
  }, []);

  let handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data, "...............");
  const editUser = async (e) => {
    e.preventDefault();
    return await Axios.put(`http://localhost:4000/edit-data/${id}`, data, {
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
          <Form.Control type="text" name="foodName" value={data.foodName} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" name="avtar" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="foodPrice"
            value={data.foodPrice}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Type</Form.Label>
          <Form.Control type="text" name="foodType" value={data.foodType} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default UpdateFood;
