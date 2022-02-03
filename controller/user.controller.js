const userModal = require("../models/user.model");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const TOKEN_KEY = "dfjfefehfefhefhefhfefh";
// const Joi = require("joi");

const getUser = async (req, res) => {
  try {
    const allUser = await userModal.find({ role: 1 });
    res.send({ data: allUser, statusCode: 200 });
  } catch (error) {
    return res.send(error);
  }
};

const editUser = async (req, res) => {
  try {
    const condition = {
      _id: req.params.id,
    };
    const exist = await userModal.findOne(condition);
    if (exist) {
      const editData = await userModal.findByIdAndUpdate({ _id: condition._id }, req.body);
      return res.status(200).send({
        statusCode: 200,
        message: "user data updated...",
      });
    } else {
      return res.status(200).send({
        statusCode: 401,
        message: "invalid userId",
      });
    }
  } catch (error) {
    return res.status(200).send({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const condition = {
      _id: req.params.id,
    };
    const exist = await userModal.find(condition);
    if (exist) {
      const result = await userModal.deleteOne({ _id: req.params.id });
      return res.status(200).send({
        statusCode: 200,
        message: "user deleted",
      });
    } else {
      return res.status(200).send({
        statusCode: 401,
        message: "invalid userId",
      });
    }
  } catch (error) {
    return res.send({
      statusCode: 401,
      message: error.message,
    });
  }
};
//.......
module.exports = {
  getUser,
  editUser,
  deleteUser,
};
