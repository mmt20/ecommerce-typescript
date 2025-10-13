import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCatPrefix, productsCleanUp } from "@store/products/productsSlice";
import { useParams } from "react-router-dom";
import { Loading } from "@components/feedback";

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
  const ProductList =
    records.length > 0
      ? records.map((product) => (
          <Col key={product.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
            <Product {...product} />
          </Col>
        ))
      : "there are no categories";
  return (
    <Container>
      <Loading status={loading} error={error}>
        <Row>{ProductList}</Row>
      </Loading>
    </Container>
  );
};

export default Products;
