import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCatPrefix, productsCleanUp } from "@store/products/productsSlice";
import { useParams } from "react-router-dom";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import type { TProduct } from "src/types/product";

const Products = () => {
  const { prefix } = useParams<{ prefix: string }>();
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const ProductsFullInfo = records.map((product) => ({
    ...product,
    quantity: cartItems[product.id] || 0,
  }));

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(prefix as string));
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);

  return (
    <Container>
      <Heading>
        <span className="text-capitalize">{prefix}</span> Products
      </Heading>
      <Loading status={loading} error={error}>
        <GridList<TProduct> records={ProductsFullInfo} renderItem={(record) => <Product {...record} />} />
      </Loading>
    </Container>
  );
};

export default Products;
