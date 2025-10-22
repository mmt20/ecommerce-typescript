import { Form, Button } from "react-bootstrap";
import type { TProduct } from "src/types/product";
import styles from "./styles.module.css";
const { cartItem, product, productImg, productInfo, cartItemSelection } = styles;
type cartItemProps = TProduct & {
  changeQuantityHandler: (productId: number, quantity: number) => void;
};
const CartItem = ({ id, img, price, title, max, quantity, changeQuantityHandler }: cartItemProps) => {
  // render option list
  const renderQuantityOptions = Array(max)
    .fill(0)
    .map((_, index) => (
      <option key={index + 1} value={index + 1}>
        {index + 1}
      </option>
    ));

  const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    changeQuantityHandler(id, newQuantity);
  };
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
        <Form.Select aria-label="Default select example" value={quantity} onChange={changeQuantity}>
          {renderQuantityOptions}
        </Form.Select>
      </div>
    </div>
  );
};

export default CartItem;
