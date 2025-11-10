import { useAppSelector, useAppDispatch } from "./../store/hooks";
import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartRemoveItem,
  clearCartProductsFullInfo,
} from "@store/cart/cartSlice";
import { useCallback, useEffect } from "react";
import type { TProduct } from "@types";
import { restOrderStatus } from "@store/order/orderSlice";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, error, loading } = useAppSelector((state) => state.cart);
  const placeOrderStatus = useAppSelector((state) => state.order.loading);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const products = productsFullInfo.map((product: TProduct) => ({
    ...product,
    quantity: items[product.id],
  }));

  const changeQuantityHandler = useCallback(
    (productId: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ productId, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (productId: number) => {
      dispatch(cartRemoveItem({ productId }));
    },
    [dispatch]
  );

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());

    return () => {
      dispatch(clearCartProductsFullInfo());
      dispatch(restOrderStatus());
      promise.abort();
    };
  }, [dispatch]);

  return { products, error, loading, userAccessToken, placeOrderStatus, changeQuantityHandler, removeItemHandler };
};

export default useCart;
