import { useAppSelector } from "@store/hooks";
import HeaderCounter from "../HeaderCounter/HeaderCounter";
import { getCartTotalQuantitySelector } from "@store/cart/selectors";
import CartIcon from "@assets/svg/cart.svg?react";
import WishlistIcon from "@assets/svg/wishlist.svg?react";
import styles from "./styles.module.css";

const { headerLeftBar } = styles;
const HeaderLeftBar = () => {
  const wishlistTotalQuantity = useAppSelector((state) => state.wishlist.itemsId.length);
  const cartTotalQuantity = useAppSelector(getCartTotalQuantitySelector);
  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        title="wishlist"
        to="wishlist"
        totalQuantity={wishlistTotalQuantity}
        svgIcon={<WishlistIcon title="wishlist" />}
      />
      <HeaderCounter title="cart" to="cart" totalQuantity={cartTotalQuantity} svgIcon={<CartIcon title="wishlist" />} />
    </div>
  );
};

export default HeaderLeftBar;
