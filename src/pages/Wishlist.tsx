import { GridList, Heading } from "@components/common";
import type { TProduct } from "src/types/product";
import { Container } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { Product } from "@components/eCommerce";
import useWishlist from "@hooks/useWishlist";

const Wishlist = () => {
  const { records, loading, error } = useWishlist();
  return (
    <div>
      <Container>
        <Heading title="Wishlist" />
        <Loading status={loading} error={error}>
          <GridList<TProduct> records={records} renderItem={(record) => <Product {...record} />} />
        </Loading>
      </Container>
    </div>
  );
};

export default Wishlist;
