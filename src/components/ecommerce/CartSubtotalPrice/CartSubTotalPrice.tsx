import type { TProduct } from "@types";
import styles from "./styles.module.css";

type CartSubtotalPriceProps = { products: TProduct[] };
const CartSubtotalPrice = ({ products }: CartSubtotalPriceProps) => {
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
    <div className={styles.container}>
      <span>Subtotal:</span>
      <span>{subtotal} EGP</span>
    </div>
  );
};

export default CartSubtotalPrice;
