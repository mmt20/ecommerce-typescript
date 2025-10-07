import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Container, Row, Col } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { records } = useAppSelector((state) => state.Categories);
  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records.length]);
  const CategoriesList =
    records.length > 0
      ? records.map((category) => (
          <Col key={category.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
            <Category {...category} />
          </Col>
        ))
      : "there are no categories";

  return (
    <Container>
      <Row>{CategoriesList}</Row>
    </Container>
  );
};

export default Categories;
