import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCatPrefix, productsCleanUp } from "@store/products/productsSlice";
import { useParams } from "react-router-dom";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";

const Products = () => {
  const { prefix } = useParams<{ prefix: string }>();
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.Product);
  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(prefix as string));
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);

  return (
    <Container>
      <Loading status={loading} error={error}>
        <GridList records={records} renderItem={(record) => <Product {...record} />} />
      </Loading>
    </Container>
  );
};

export default Products;
