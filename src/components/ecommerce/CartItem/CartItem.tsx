import { Form, Button } from "react-bootstrap";
import type { TProduct } from "src/types/product";
import styles from "./styles.module.css";
import { memo } from "react";
const { cartItem, product, productImg, productInfo, cartItemSelection } = styles;
type cartItemProps = TProduct & {
  changeQuantityHandler: (productId: number, quantity: number) => void;
  removeItemHandler: (productId: number) => void;
};
const CartItem = memo(
  ({ id, img, price, title, max, quantity, changeQuantityHandler, removeItemHandler }: cartItemProps) => {
    console.log("Cart Item Rendered => ", id, "Quantity => ", quantity);
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
    const removeItem = () => {
      removeItemHandler(id);
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
            <Button
              variant="secondary"
              style={{ color: "white", width: "100px" }}
              className="mt-auto"
              onClick={removeItem}
            >
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
  }
);

export default CartItem;
