import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartRemoveItem,
  ClearCartProductsFullInfo,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";
import type { TProduct } from "src/types/product";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, error, loading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());

    return () => {
      dispatch(ClearCartProductsFullInfo());
      promise.abort();
    };
  }, [dispatch]);

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
  return { products, error, loading, changeQuantityHandler, removeItemHandler };
};

export default useCart;
