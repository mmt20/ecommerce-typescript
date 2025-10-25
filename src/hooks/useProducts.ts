import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCatPrefix, cleanUpProductsRecords } from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useProducts = () => {
  const { prefix } = useParams<{ prefix: string }>();
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);

  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsId);

  const ProductsFullInfo = records.map((product) => ({
    ...product,
    quantity: cartItems[product.id] || 0,
    isLiked: wishlistItemsId.includes(product.id),
  }));

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(prefix as string));
    return () => {
      dispatch(cleanUpProductsRecords());
    };
  }, [dispatch, prefix]);
  return { ProductsFullInfo, loading, error, prefix };
};
export default useProducts;
