import type { TProduct } from "src/types/product";
import CartItem from "../CartItem/CartItem";

type CartItemListPros = {
  products: TProduct[];
  changeQuantityHandler: (productId: number, quantity: number) => void;
  removeItemHandler: (productId: number) => void;
};
const CartItemList = ({ products, changeQuantityHandler, removeItemHandler }: CartItemListPros) => {
  const renderList = products.map((product: TProduct) => (
    <CartItem
      key={product.id}
      {...product}
      changeQuantityHandler={changeQuantityHandler}
      removeItemHandler={removeItemHandler}
    />
  ));

  return <div>{renderList}</div>;
};

export default CartItemList;
