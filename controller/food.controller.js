const productData = require("../models/productModel");
const { redirect } = require("express/lib/response");
const e = require("express");

//.......add User.......//
const addData = async (req, res) => {
  try {
    const condition = {
      foodName: req.body.foodName,
    };
    const exist = await productData.findOne(condition);
    if (exist) {
      return res.status(200).send({
        statusCode: 409,
        message: "food is already in database",
      });
    } else {
      const user = await productData.create({ ...req.body });
      return res.status(201).send({
        statusCode: 200,
        message: "food add succesfully",
      });
    }
  } catch (error) {
    if (error) throw error;
  }
};

const getData = async (req, res) => {
  if (req.query.foodType) {
    try {
      const result = await productData.find({ foodType: req.query.foodType });
      res.send(result);
    } catch (error) {}
  } else {
    try {
      const allItems = await productData.find();
      res.send(allItems);
    } catch (error) {}
  }
};

const editData = async (req, res) => {
  try {
    const condition = {
      _id: req.params.id,
    };
    const exist = await productData.findOne(condition);
    const editStudent = await productData.findByIdAndUpdate({ _id: condition._id }, req.body);
    return res.status(200).send({
      statusCode: 200,
      message: "data updated succesfully",
    });
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
