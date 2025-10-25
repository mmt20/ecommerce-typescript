import useProducts from "@hooks/useProducts";
import { Container } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import type { TProduct } from "src/types/product";

const Products = () => {
  const { ProductsFullInfo, loading, error, prefix } = useProducts();

  return (
    <Container>
      <Heading title={`${prefix?.toUpperCase()} Products`} />

      <Loading status={loading} error={error}>
        <GridList<TProduct> records={ProductsFullInfo} renderItem={(record) => <Product {...record} />} />
      </Loading>
    </Container>
  );
};

export default Products;
