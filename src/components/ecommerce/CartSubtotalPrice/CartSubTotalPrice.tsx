import type { TProduct } from "@types";
import styles from "./styles.module.css";
import { Button } from "react-bootstrap";

type CartSubtotalPriceProps = { products: TProduct[]; userAccessToken: string | null };
const CartSubtotalPrice = ({ products, userAccessToken }: CartSubtotalPriceProps) => {
  const subtotal = products.reduce((total, product) => {
    const price = product.price;
    const quantity = product.quantity;
    if (quantity && typeof quantity === "number") {
      return total + price * quantity;
    } else {
      return total;
    }
  }, 0);
  return (
    <>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{subtotal} EGP</span>
      </div>
      {userAccessToken && (
        <div className={styles.container} style={{ justifyContent: "flex-end", marginTop: "1rem" }}>
          <Button variant="info" style={{ color: "white" }}>
            Place Order
          </Button>
        </div>
      )}
    </>
  );
};

export default CartSubtotalPrice;
