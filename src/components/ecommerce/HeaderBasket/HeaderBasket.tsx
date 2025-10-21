import { useAppSelector } from "@store/hooks";
import Logo from "../../../assets/svg/cart.svg?react";

import styles from "./styles.module.css";
import { getCartTotalQuantity } from "@store/cart/cartSlice";
const { basketContainer, basketQuantity } = styles;
const HeaderBasket = () => {
  const totalQuantity = useAppSelector((state) => getCartTotalQuantity(state.cart));
  console.log("HeaderBasket rendered");
  return (
    <div className={basketContainer}>
      <Logo />
      <div className={basketQuantity}>{totalQuantity}</div>
    </div>
  );
};

export default HeaderBasket;
