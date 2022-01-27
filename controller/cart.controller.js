const { redirect } = require("express/lib/response");
const e = require("express");
const cartData = require("../models/cart.model");
const req = require("express/lib/request");

//.......addToCart........//
const addToCart = async (req, res) => {
  const productId = req.params.id;
  const userId = req.tokenData._doc._id;
  // const data = req.body;
  try {
    const result = await cartData.create({
      // ...data,
      userId,
      foodDetail: productId,
    });
    console.log(result);
    return res.status(200).send({
      message: " product added to the cart ",
    });
  } catch (error) {}
};

const getCart = async (req, res) => {
  const userId = req.tokenData._doc._id;

  try {
    const data = await cartData.find({ userId }).populate("foodDetail");
    // console.log(data, "dataaaa");
    let totalPrice = 0;
    data.map((item) => (totalPrice += parseInt(item.foodDetail.foodPrice)));
    console.log(totalPrice);
    res.send({
      data,
      message: `total price is ${totalPrice}`,
    });
  } catch (error) {
    console.log(error);
  }
};

const removeCart = async (req, res) => {
  const userId = req.tokenData._doc._id;
  try {
    const condition = {
      _id: req.params.id,
    };
    // console.log(condition);
    const exist = await cartData.findOne({ foodDetail: condition._id, userId });
    console.log(exist, "========");
    if (exist) {
      const result = await cartData.deleteOne({ foodDetail: req.params.id, userId });
      return res.status(200).send({
        statusCode: 200,
        message: "remove cart",
      });
    }
    return res.status(404).send({
      statusCode: 404,
      message: "product not found",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeCart,
};
