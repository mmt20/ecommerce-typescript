import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Container } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { GridList } from "@components/common";
import { Loading } from "@components/feedback";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { records, error, loading } = useAppSelector((state) => state.Categories);
  useEffect(() => {
    if (loading === "idle") {
      dispatch(actGetCategories());
    }
  }, [dispatch, loading]);

  return (
    <Container>
      <Loading status={loading} error={error}>
        <GridList records={records} renderItem={(record) => <Category {...record} />} />
      </Loading>
    </Container>
  );
};

export default Categories;
