const productData = require("../models/productModel");
const { redirect } = require("express/lib/response");
const e = require("express");
var fs = require("fs");
const path = require("path");

//.......add food.......//
const addData = async (req, res) => {
  const image = req.file.path;
  console.log(image, "-------");
  try {
    const user = await productData.create({ ...req.body, avtar: image });

    // console.log(user);
    return res.status(201).send({
      statusCode: 200,
      message: "food add succesfully",
    });
  } catch (error) {
    throw error;
  }
};

const getData = async (req, res, next) => {
  const pageSize = 4;
  const currentPage = 1;

  if (req.query.foodType) {
    try {
      const result = await productData.find({ foodType: req.query.foodType });
      res.send(result);
    } catch (error) {}
  } else {
    try {
      const allItems = await productData
        .find()
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);

      const total = await productData.countDocuments();
      console.log(total);
      res.send({ data: allItems, statusCode: 200 });
    } catch (error) {
      return res.send(error);
    }
  }
};

const editData = async (req, res) => {
  try {
    const condition = {
      _id: req.params.id,
    };
    const exist = await productData.findOne(condition);
    if (exist) {
      const editStudent = await productData.findByIdAndUpdate({ _id: condition._id }, req.body);
      return res.status(200).send({
        editStudent,
        statusCode: 200,
        message: "data updated succesfully",
      });
    } else {
      return res.status(200).send({
        statusCode: 409,
        message: "invalid dataId",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const deleteData = async (req, res) => {
  try {
    const condition = {
      _id: req.params.id,
    };
    const exist = await productData.findOne(condition);
    if (exist) {
      const result = await productData.deleteOne({ _id: req.params.id });
      return res.status(200).send({
        statusCode: 200,
        message: "data deleted",
      });
    } else {
      return res.status(200).send({
        statusCode: 409,
        message: "invalid dataId",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  addData,
  getData,
  editData,
  deleteData,
};
