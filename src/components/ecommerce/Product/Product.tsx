import { memo, useEffect, useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import ProductInfo from "@components/ProductInfo/ProductInfo";
import type { TProduct } from "@types";
import { addToCart } from "@store/cart/cartSlice";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import { addToast } from "@store/toasts/toastsSlice";
const { maximumNotice, wishlistBtn } = styles;

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

  useEffect(() => {
    if (!quantityReachedToMax) return;

    dispatch(
      addToast({
        type: "warning",
        message: `You have reached the maximum quantity for ${title}.`,
        displayAppearance: true,
      })
    );
  }, [quantityReachedToMax, dispatch, title]);

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    dispatch(
      addToast({
        type: "success",
        title: "Added to Cart",
        message: `${title} has been added to your cart.`,
      })
    );
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
      .then(() => {
        setIsLoading(false);
        if (!isLiked) {
          dispatch(
            addToast({
              type: "success",
              message: `${title} has been added to your wishlist.`,
            })
          );
        }
      })
      .catch(() => {
        setIsLoading(false);
        dispatch(
          addToast({
            type: "danger",
            message: `Failed to update wishlist for ${title}. Please try again.`,
          })
        );
      });
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
      <ProductInfo title={title} img={img} price={price}>
        <div className={wishlistBtn} onClick={actLikeToggleHandler}>
          {isLoading ? <Spinner animation="border" size="sm" variant="primary" /> : isLiked ? <LikeFill /> : <Like />}
        </div>

        <p className={maximumNotice}>
          {quantityReachedToMax ? "You reach to the limit " : `you can add ${currentRemainQuantity} item(s)`}
        </p>
        <Button
          variant="info"
          style={{ color: "white", width: "100%" }}
          onClick={addToCartHandler}
          disabled={isBtnDisabled || quantityReachedToMax}
        >
          {isBtnDisabled ? <Spinner animation="border" size="sm" /> : "Add to cart"}
        </Button>
      </ProductInfo>
    </>
  );
});

export default Product;
