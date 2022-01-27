const userModal = require("../models/user.model");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const TOKEN_KEY = "dfjfefehfefhefhefhfefh";
// const Joi = require("joi");
const { redirect } = require("express/lib/response");

//.......user register.......//
const register = async (req, res) => {
  const hashPass = await bcrypt.hash(req.body.password, 10);
  try {
    const condition = {
      email: req.body.email,
    };
    const exist = await userModal.findOne(condition);
    if (exist) {
      return res.status(200).send({
        statusCode: 409,
        message: "user is alredy exist",
      });
    } else {
      // const token = jwt.sign({ email: req.body.email }, TOKEN_KEY, {
      //   expiresIn: "2h",
      // });
      const user = await userModal.create({ ...req.body, password: hashPass });
      // user.save();
      return res.status(201).send({
        statusCode: 200,
        message: "registration succesfully",
      });
    }
  } catch (error) {
    if (error) throw error;
  }
};

//....... user login .......//
const login = async (req, res) => {
  try {
    const exist = await userModal.findOne({ email: req.body.email });
    // console.log(exist);
    if (!exist) {
      return res.status(404).send({
        message: "invalid user email or password",
      });
    } else if (exist) {
      const passValidation = await bcrypt.compare(req.body.password, exist.password);
      // console.log(passValidation);
      if (!passValidation) {
        return res.status(404).send({
          message: "invalid user email or password",
        });
      } else {
        const token = jwt.sign({ ...exist }, "dfjfefehfefhefhefhfefh", {
          expiresIn: "2h",
        });
        return res.status(200).send({
          message: "login succesfully",
          token: token,
        });
      }
    }
  } catch (error) {
    // console.log(error);
  }
};

//.......
module.exports = {
  register,
  login,
};
