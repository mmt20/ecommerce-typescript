import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartRemoveItem,
  ClearCartProductsFullInfo,
} from "@store/cart/cartSlice";
import { Heading } from "@components/common";
import { Loading } from "@components/feedback";
import type { TProduct } from "src/types/product";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, error, loading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(actGetProductsByItems());

    return () => {
      dispatch(ClearCartProductsFullInfo());
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
  return (
    <>
      <Heading title="Your Cart" />
      <Loading error={error} status={loading}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice products={products} />
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </Loading>
    </>
  );
};

export default Cart;
