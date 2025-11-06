import { Container } from "react-bootstrap";
import { Category } from "@components/eCommerce";

import { GridList, Heading } from "@components/common";
import { Loading } from "@components/feedback";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const { records, loading, error } = useCategories();
  return (
    <Container>
      <Heading title="Categories" />
      <Loading type="category" status={loading} error={error}>
        <GridList records={records} renderItem={(record) => <Category {...record} />} />
      </Loading>
    </Container>
  );
};

export default Categories;
