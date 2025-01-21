import { ShopContext } from "../../context/shop-context";
import { useGetProducts } from "../../hooks/useGetProducts";
import { CartItem } from "./cart-item";
import { useContext } from "react";
import "./styles.css";

// fixing checkout page rn
export const CheckoutPage = () => {
  const { getCartItemCount, getTotalCartAmount } = useContext<IShopContext>(ShopContext);
  const { products } = useGetProducts();

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
      <div className="checkout">
        <p> Subtotal: ${totalAmount.toFixed(2)}</p>
        <button> Continue Shopping</button>
        <button> Checkout</button>
      </div>
    </div>
  );
};
