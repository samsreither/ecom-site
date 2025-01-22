import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ShopContext } from "../context/shop-context";

export const Navbar = () => {
  const { availableMoney } = useContext<IShopContext>(ShopContext);

  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>Shop</h1>
      </div>

      <div className="navbar-links">
        <Link to="/"> Shop </Link>
        <Link to="/purchased-items"> Purchases </Link>
        <Link to="/checkout">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
        <span> ${availableMoney.toFixed(2)} </span>
      </div>
    </div>
  );
};
