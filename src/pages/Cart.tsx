import { Heading } from "@components/common";
import { Loading, LottieHandler } from "@components/feedback";

import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import useCart from "@hooks/useCart";

const Cart = () => {
  const { products, error, loading, userAccessToken, changeQuantityHandler, removeItemHandler } = useCart();
  return (
    <>
      <Heading title="Your Cart" />
      <Loading type="cart" error={error} status={loading}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice products={products} userAccessToken={userAccessToken} />
          </>
        ) : (
          <LottieHandler type="empty" message="Your cart is empty" />
        )}
      </Loading>
    </>
  );
};

export default Cart;
