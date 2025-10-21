import { memo, useEffect, useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import type { TProduct } from "src/types/product";
import { addToCart } from "@store/cart/cartSlice";
const { product, productImg, maximumNotice } = styles;

const Product = memo(({ id, img, title, price, quantity, max }: TProduct) => {
  const dispatch = useAppDispatch();

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const currentRemainQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainQuantity <= 0 ? true : false;
  useEffect(() => {
    if (!isBtnDisabled) return;

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };
  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price} EGP</h3>
      <p className={maximumNotice}>
        {quantityReachedToMax ? "You reach to the limit " : `you can add ${currentRemainQuantity} item(s)`}
      </p>
      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={addToCartHandler}
        disabled={isBtnDisabled || quantityReachedToMax}
      >
        {isBtnDisabled ? <Spinner animation="border" size="sm" /> : "Add to cart"}
      </Button>
    </div>
  );
});

export default Product;
