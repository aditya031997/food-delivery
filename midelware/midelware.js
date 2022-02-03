const jwt = require("jsonwebtoken");
const path = require("path");
var fs = require("fs");
const multer = require("multer");
const Joi = require("joi");
const res = require("express/lib/response");
const productData = require("../models/productModel");
/**
 * @author prabhakar sarkar
 *@description this is jwt verification function
 * @date 6-8-2021
 */
const checkAuth = async (req, res, next) => {
  // console.log(req.headers.authorization, "kkkkkkkkkkkkkkkkkkkk");
  try {
    let token = "";
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token);
    } else {
      token = req.headers.authorization;
    }
    const decoded = await jwt.verify(token, "dfjfefehfefhefhefhfefh");
    // const userId = req.params.id;
    // console.log(userId);
    req.tokenData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized!",
      status: 401,
    });
  }
};

const checkRole = (roles) => async (req, res, next) => {
  // console.log(req.tokenData._doc.role, "tokkeeeeen");
  if (!roles.includes(req.tokenData._doc.role)) {
    return res.status(403).send({
      message: "Access denied!",
      status: 403,
    });
  }
  next();
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(file, "hhhhhhhhhh");
    cb(null, "upload/image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(new Error("Please upload an Image!!"));
    }
    cb(undefined, true);
  },
});

const validation = async (req, res, next) => {
  const condition = {
    foodName: req.body.foodName,
  };
  const exist = await productData.findOne(condition);
  if (exist) {
    deleteFile(req.file);

    return res.status(200).send({
      statusCode: 409,
      message: "food is already in database",
    });
  }
  const schema = Joi.object({
    foodName: Joi.string().required(),
    foodPrice: Joi.string().required(),
    foodType: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    deleteFile(req.file);

    return res.status(400).send({
      message: error.message || "Bad Request!",
    });
  } else {
    req.body = value;
    next();
  }
};

const deleteFile = (file) => {
  if (file) fs.unlink(file.path, (err) => console.log(err));
};

module.exports = {
  checkAuth,
  checkRole,
  upload,
  validation,
};
