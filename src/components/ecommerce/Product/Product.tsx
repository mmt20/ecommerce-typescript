import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import type { TProduct } from "src/types/product";
const { product, productImg } = styles;

const Product = ({ cat_prefix, img, title, price }: TProduct) => {
  return (
    <Link to={`/products/${cat_prefix}`} style={{ textDecoration: "none", color: "black" }}>
      <div className={product}>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <h2>{title}</h2>
        <h3>{price} EGP</h3>
        <Button variant="info" style={{ color: "white" }}>
          Add to cart
        </Button>
      </div>
    </Link>
  );
};

export default Product;
