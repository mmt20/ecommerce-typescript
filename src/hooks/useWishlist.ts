import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, CleanWishlistProductFullInfo } from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { productsFullInfo, loading, error } = useAppSelector((state) => state.wishlist);

  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(actGetWishlist());

    return () => {
      dispatch(CleanWishlistProductFullInfo());
    };
  }, [dispatch]);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: true,
  }));
  return { records, loading, error };
};
export default useWishlist;
