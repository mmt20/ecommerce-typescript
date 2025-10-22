import type { TProduct } from "src/types/product";
import CartItem from "../CartItem/CartItem";

type CartItemListPros = { products: TProduct[] };
const CartItemList = ({ products }: CartItemListPros) => {
  const renderList = products.map((product: TProduct) => <CartItem key={product.id} {...product} />);

  return <div>{renderList}</div>;
};

export default CartItemList;
