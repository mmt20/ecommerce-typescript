import { Form, Button } from "react-bootstrap";
import type { TProduct } from "src/types/product";
import styles from "./styles.module.css";
const { cartItem, product, productImg, productInfo, cartItemSelection } = styles;
type cartItemProps = TProduct;
const CartItem = ({ img, price, title, max, quantity }: cartItemProps) => {
  const renderQuantityOptions = Array(max)
    .fill(0)
    .map((_, index) => (
      <option key={index + 1} value={index + 1}>
        {index + 1}
      </option>
    ));

  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <div className={productInfo}>
          <h2>{title}</h2>
          <h3>{price.toFixed(2)} EGP</h3>
          <Button variant="secondary" style={{ color: "white", width: "100px" }} className="mt-auto">
            Remove
          </Button>
        </div>
      </div>

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select aria-label="Default select example" value={quantity}>
          {renderQuantityOptions}
        </Form.Select>
      </div>
    </div>
  );
};

export default CartItem;
