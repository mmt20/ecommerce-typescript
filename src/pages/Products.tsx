import useProducts from "@hooks/useProducts";
import { Container } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import type { TProduct } from "@types";

const Products = () => {
  const { ProductsFullInfo, loading, error, prefix } = useProducts();

  return (
    <Container>
      <Heading title={`${prefix?.toUpperCase()} Products`} />

      <Loading type="product" status={loading} error={error}>
        <GridList<TProduct>
          emptyMessage="There are no products"
          records={ProductsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
