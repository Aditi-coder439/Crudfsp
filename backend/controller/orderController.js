const Order = require("../models/Oder"); 
const User = require("../models/User");

const placeOrder = async (req, res) => {
  try {
    const { items: cartItems } = req.body; 

    if (!cartItems || !Array.isArray(cartItems)) {
      return res.status(400).json({ success: false, message: "items must be an array" });
    }

    let totalPrice = 0;
    const itemsToSave = []; 

    for (let cartItem of cartItems) {
      const user = await User.findById(cartItem._id); 

      if (!user) {
        return res.status(404).json({ success: false, message: `User ID ${cartItem._id} not found` });
      }

      // Convert to Number and default to 0 if null/undefined
      const price = Number(user.price) || 0; 
      const quantity = Number(cartItem.quantity) || 1;

      totalPrice += price * quantity; 

      itemsToSave.push({
        userId: user._id,
        name: user.name,
        price: price, // Now saving the converted number
        quantity: quantity,
      });
    }

    const order = new Order({
      items: itemsToSave, 
      totalPrice: Number(totalPrice), 
    });

    await order.save(); 

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { placeOrder };