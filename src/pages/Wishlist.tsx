import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, CleanWishlistProductFullInfo } from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";
import { GridList, Heading } from "@components/common";
import type { TProduct } from "src/types/product";
import { Container } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { Product } from "@components/eCommerce";

const Wishlist = () => {
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
  return (
    <div>
      <Container>
        <Heading>Wishlist</Heading>
        <Loading status={loading} error={error}>
          <GridList<TProduct> records={records} renderItem={(record) => <Product {...record} />} />
        </Loading>
      </Container>
    </div>
  );
};

export default Wishlist;
