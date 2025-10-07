import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCatPrefix } from "@store/products/productsSlice";
import { useParams } from "react-router-dom";

const Products = () => {
  const { prefix } = useParams<{ prefix: string }>();
  const dispatch = useAppDispatch();
  const { records } = useAppSelector((state) => state.Product);
  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(prefix as string));
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
      <Row>{ProductList}</Row>
    </Container>
  );
};

export default Products;
