import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Container, Table, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Update from "../component/Update-user";
import Header from "./Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserData = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [singleUser, setSingleUser] = useState();

  useEffect(() => {
    getUser();
  }, [show]);

  const handleShow = (data) => {
    setShow(true);
    setSingleUser(data);
  };

  const handleClose = () => {
    setShow(false);
  };
  const token = localStorage.getItem("token");

  const getUser = () => {
    Axios("http://localhost:4000/get-user", { headers: { Authorization: "Bearer " + token } }).then(
      (res) => {
        console.log(res.data.data);
        setData(res.data.data);
      }
    );
  };

  const deleteUser = async (id) => {
    await Axios(`http://localhost:4000/delete-user/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    }).then((res) => {
      toast.success("user deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
      getUser();
      console.log(res);
    });
  };
  return (
    <div>
      <ToastContainer autoClose={800} />
      <Header />
      <h1 style={{ textAlign: "center" }}>User Data</h1>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>email</th>
              <th>PhoneNo</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>
                    <EditIcon onClick={() => handleShow(item)} />
                    <DeleteIcon onClick={() => deleteUser(item._id)} />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit user</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Update theUser={singleUser} onClose={handleClose} />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default UserData;
