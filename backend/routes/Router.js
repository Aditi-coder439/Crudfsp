const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const OrderController = require("../controller/orderController"); 
const upload = require("../controller/multiConfig");

// User Routes
router.post("/register", upload.single('image'), UserController.createUser);
router.get("/viewer", UserController.getUsers);
router.get("/user/:id", UserController.getUserById);
router.put("/updateuser/:id", UserController.updateUser);
router.delete("/deleteuser/:id", UserController.deleteUser);

// Order Route
router.post("/place-order", OrderController.placeOrder);

module.exports = router;