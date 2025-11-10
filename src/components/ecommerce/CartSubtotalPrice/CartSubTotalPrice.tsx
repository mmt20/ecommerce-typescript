import type { TProduct } from "@types";
import styles from "./styles.module.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { actPlaceOrder } from "@store/order/orderSlice";
import { useAppDispatch } from "@store/hooks";
import { clearCartAfterPlaceOrder } from "@store/cart/cartSlice";

type CartSubtotalPriceProps = { products: TProduct[]; userAccessToken: string | null };

const CartSubtotalPrice = ({ products, userAccessToken }: CartSubtotalPriceProps) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = products.reduce((total, product) => {
    const price = product.price;
    const quantity = product.quantity;
    if (quantity && typeof quantity === "number") {
      return total + price * quantity;
    } else {
      return total;
    }
  }, 0);

  const handelModal = () => {
    setShowModal((prev) => !prev);
    setError(null);
  };

  const handelPlaceOrder = async () => {
    setLoading(true);
    await dispatch(actPlaceOrder(subtotal))
      .unwrap()
      .then(() => {
        dispatch(clearCartAfterPlaceOrder());
        alert("Order placed successfully!");
        setShowModal(false);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Modal show={showModal} onHide={handelModal} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you shure you want to place order with subtotal {subtotal} EGP
          {!loading && error && (
            <div style={{ color: "red", marginTop: "1rem" }}>
              <strong>Error:</strong> {error}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handelModal}>
            Close
          </Button>
          <Button variant="info" style={{ color: "white" }} onClick={handelPlaceOrder} disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="visually-hidden">Loading...</span>
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{subtotal} EGP</span>
      </div>
      {userAccessToken && (
        <div className={styles.container} style={{ justifyContent: "flex-end", marginTop: "1rem" }}>
          <Button variant="info" style={{ color: "white" }} onClick={handelModal}>
            Place Order
          </Button>
        </div>
      )}
    </>
  );
};

export default CartSubtotalPrice;
