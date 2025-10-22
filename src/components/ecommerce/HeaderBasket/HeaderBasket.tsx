import { useEffect, useState } from "react";
import { useAppSelector } from "@store/hooks";
import Logo from "../../../assets/svg/cart.svg?react";
import { getCartTotalQuantitySelector } from "@store/cart/cartSlice";

import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
const { basketContainer, basketQuantity, pumpCartQuantity, basketCart } = styles;

const HeaderBasket = () => {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);

  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);
    return () => clearTimeout(debounce);
  }, [totalQuantity]);
  return (
    <div className={basketContainer} onClick={() => navigate("/cart")}>
      <div className={basketCart}>
        <Logo />
        <div className={`${basketQuantity} ${isAnimate ? pumpCartQuantity : ""}`}>{totalQuantity}</div>
      </div>
      <h3>Cart</h3>
    </div>
  );
};

export default HeaderBasket;
