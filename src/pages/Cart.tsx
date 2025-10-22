import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByItems } from "@store/cart/cartSlice";
import { Heading } from "@components/common";
import { Loading } from "@components/feedback";
import type { TProduct } from "src/types/product";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, error, loading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(actGetProductsByItems());
  }, [dispatch, items]);
  const products = productsFullInfo.map((product: TProduct) => ({ ...product, quantity: items[product.id] }));

  return (
    <>
      <Heading>Cart</Heading>
      <Loading error={error} status={loading}>
        <CartItemList products={products} />
        <CartSubtotalPrice />
      </Loading>
    </>
  );
};

export default Cart;
