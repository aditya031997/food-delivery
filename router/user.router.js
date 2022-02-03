const express = require("express");
const { checkAuth, checkRole, validation, upload } = require("../midelware/midelware");
const router = express.Router();
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
const foodController = require("../controller/food.controller");
const cartController = require("../controller/cart.controller");

// food route//
router.post(
  "/add-food",
  checkAuth,
  checkRole("2"),
  upload.single("avtar"),
  validation,
  foodController.addData
);
router.get("/get-food", checkAuth, foodController.getData);
router.put("/edit-data/:id", checkAuth, checkRole("2"), foodController.editData);
router.delete("/delete-data/:id", checkAuth, checkRole("2"), foodController.deleteData);

// Cart routte //
router.post("/addtocart/:id", checkAuth, cartController.addToCart);
router.get("/get-cart", checkAuth, cartController.getCart);
router.delete("/remove-cart/:id", checkAuth, cartController.removeCart);

// auth route//
router.post("/register", authController.register);
router.post("/login", authController.login);

// user route//
router.get("/get-user", checkAuth, checkRole("2"), userController.getUser);
router.put("/edit-user/:id", checkAuth, checkRole("2"), userController.editUser);
router.delete("/delete-user/:id", checkAuth, checkRole("2"), userController.deleteUser);

module.exports = router;
