const express = require("express");
const { checkAuth, checkRole } = require("../midelware/midelware");
const router = express.Router();
const userController = require("../controller/user.controller");
const foodController = require("../controller/food.controller");
const cartController = require("../controller/cart.controller");

router.post("/add-food", checkAuth, checkRole("2"), foodController.addData);
router.get("/get-food", checkAuth, foodController.getData);
router.put("/edit-data/:id", checkAuth, checkRole("2"), foodController.editData);
router.delete("/delete-data/:id", checkAuth, checkRole("2"), foodController.deleteData);

// ToCart //
router.post("/addtocart/:id", checkAuth, cartController.addToCart);
router.get("/get-cart", checkAuth, cartController.getCart);
router.delete("/remove-cart/:id", checkAuth, cartController.removeCart);

// user authentication//
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
