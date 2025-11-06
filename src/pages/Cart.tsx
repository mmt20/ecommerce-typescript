import { Heading } from "@components/common";
import { Loading } from "@components/feedback";

import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import useCart from "@hooks/useCart";

const Cart = () => {
  const { products, error, loading, changeQuantityHandler, removeItemHandler } = useCart();
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
