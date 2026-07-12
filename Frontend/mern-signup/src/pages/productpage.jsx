import React, { useState } from "react";
import CartPage from "./cartpage";

const ProductsPage = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      {/* Your product cards here */}
      <CartPage
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </div>
  );
};

export default ProductsPage;
