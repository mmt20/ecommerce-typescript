import type { TProduct } from "src/types/product";
import CartItem from "../CartItem/CartItem";

type CartItemListPros = {
  products: TProduct[];
  changeQuantityHandler: (productId: number, quantity: number) => void;
};
const CartItemList = ({ products, changeQuantityHandler }: CartItemListPros) => {
  const renderList = products.map((product: TProduct) => (
    <CartItem key={product.id} {...product} changeQuantityHandler={changeQuantityHandler} />
  ));

  return <div>{renderList}</div>;
};

export default CartItemList;
