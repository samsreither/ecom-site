import { ShopContext } from "../../context/shop-context";
import { useGetProducts } from "../../hooks/useGetProducts";
import { CartItem } from "./cart-item";
import { useContext } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

// fixing checkout page rn
export const CheckoutPage = () => {
  const { getCartItemCount, getTotalCartAmount, checkout } = useContext<IShopContext>(ShopContext);
  const { products } = useGetProducts();
  const navigate = useNavigate();

  const totalAmount = getTotalCartAmount()

  return (
    <div className="cart">
      {" "}
      <div>
        {" "}
        <h1> Your Cart Items </h1>
      </div>
      <div className="cart">
        {products.map((product: IProduct) => {
          if (getCartItemCount(product._id) !== 0) {
            return <CartItem product={product} />;
          }
        })}
      </div>
      {totalAmount > 0 ? (
      <div className="checkout">
        <p> Subtotal: ${totalAmount.toFixed(2)}</p>
        <button onClick={() => navigate("/")}> Continue Shopping</button>
        <button onClick={checkout}> Checkout</button>
      </div>
      ) : (<h1> Your Shopping Cart is Empty</h1>)}
    </div>
  );
};
