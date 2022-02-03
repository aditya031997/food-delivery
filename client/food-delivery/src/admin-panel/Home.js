import React, { useState, useEffect } from "react";
import Header from "./Header";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateFood from "../component/Update-Food";
import { Button, Container, Table, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Home = () => {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [show, setShow] = useState(false);
  const [singleUser, setSingleUser] = useState();

  useEffect(() => {
    getData();
  }, [show]);

  const handleShow = (data) => {
    setShow(true);
    setSingleUser(data);
  };

  const handleClose = () => {
    setShow(false);
  };

  const token = localStorage.getItem("token");
  const getData = async () => {
    await Axios("http://localhost:4000/get-food", {
      headers: { Authorization: "Bearer " + token },
    }).then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  };
  const deleteData = async (id) => {
    await Axios(`http://localhost:4000/delete-data/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    }).then((res) => {
      toast.success("Data deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
      getData();
      console.log(res);
    });
  };
  return (
    <div>
      <ToastContainer autoClose={1000} />
      <Header />
      <h1 style={{ textAlign: "center" }}>Product Data</h1>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>image</th>
              <th>Price</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.foodName}</td>
                  <td>
                    {
                      <img
                        style={{ height: "9rem", width: "12rem" }}
                        src={"http://localhost:4000/" + item.avtar}
                      />
                    }
                  </td>
                  <td>
                    <CurrencyRupeeIcon />
                    {item.foodPrice}
                  </td>
                  <td>{item.foodType}</td>
                  <td>
                    <EditIcon onClick={() => handleShow(item)} />
                    <DeleteIcon onClick={() => deleteData(item._id)} />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit foodData</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <UpdateFood theUser={singleUser} onClose={handleClose} />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Home;
