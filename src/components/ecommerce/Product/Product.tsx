import { memo, useEffect, useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import type { TProduct } from "@types";
import { addToCart } from "@store/cart/cartSlice";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
const { product, productImg, maximumNotice, wishlistBtn } = styles;

const Product = memo(({ id, img, title, price, quantity, max, isLiked, isAuthenticated }: TProduct) => {
  const dispatch = useAppDispatch();

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const actLikeToggleHandler = () => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    dispatch(actLikeToggle(id))
      .unwrap()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>You need to login first to add item to wishlist</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
      <div className={product}>
        <div className={wishlistBtn} onClick={actLikeToggleHandler}>
          {isLoading ? <Spinner animation="border" size="sm" variant="primary" /> : isLiked ? <LikeFill /> : <Like />}
        </div>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <h2>{title}</h2>
        <h3>{price.toFixed(2)} EGP</h3>
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
    </>
  );
});

export default Product;
