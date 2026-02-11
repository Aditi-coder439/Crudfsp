const express = require("express");
const OderRouter = express.Router();
const OrderController = require("../controller/orderController");

// This route is called via /api/orders/place
OderRouter.post("/place", OrderController.placeOrder);

module.exports = OderRouter;