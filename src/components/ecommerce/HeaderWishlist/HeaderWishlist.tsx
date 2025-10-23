import { useEffect, useState } from "react";
import Logo from "../../../assets/svg/cart.svg?react";

import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
const { container, totalNum, pumpAnimate, iconWrapper } = styles;

const HeaderWishlist = () => {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);

  const totalQuantity = 0;
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
    <div className={container} onClick={() => navigate("/cart")}>
      <div className={iconWrapper}>
        <Logo />
        {totalQuantity > 0 && <div className={`${totalNum} ${isAnimate ? pumpAnimate : ""}`}>{totalQuantity}</div>}
      </div>
      <h3>Wishlist</h3>
    </div>
  );
};

export default HeaderWishlist;
