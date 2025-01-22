import { ShopContext, IShopContext } from "../../context/shop-context";
import { useGetProducts } from "../../hooks/useGetProducts";
import { Product } from "./product";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import './styles.css';

export const ShopPage = () => {
  const { products } = useGetProducts();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="shop">
      <div className="products">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};
