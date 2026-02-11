import { useSelector, useDispatch } from "react-redux";
// Imported increase and decrease actions
import { clearCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const res = await fetch("http://localhost:5000/api/place-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Fixed: Key changed to 'items' to match your backend controller
      body: JSON.stringify({ items: cartItems }), 
    });

    const data = await res.json();

    if (res.ok) {
      alert("Order placed successfully");
      dispatch(clearCart());
    } else {
      alert(data.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Cart Page</h1>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div>
          <h2>Cart</h2>

          {cartItems.map((item) => (
            <div key={item._id} style={{ marginBottom: "15px", display: "flex", gap: "10px", alignItems: "center" }}>
              {item.name} - ₹{item.price}
              
              {/* Added increase and decrease buttons */}
              <button onClick={() => dispatch(decreaseQuantity(item._id))}>-</button>
              <span>{item.quantity || 1}</span>
              <button onClick={() => dispatch(increaseQuantity(item._id))}>+</button>
              
              <span>Total: ₹{item.price * (item.quantity || 1)}</span>
            </div>
          ))}

          <h3>Total Price: ₹{subtotal}</h3>

          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;