import { Col, Row } from "react-bootstrap";
import { LottieHandler } from "@components/feedback";
type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
  emptyMessage?: string;
};

type hasID = {
  id?: number;
};
const GridList = <T extends hasID>({ records, renderItem, emptyMessage }: GridListProps<T>) => {
  const CategoriesList =
    records.length > 0 ? (
      records.map((category) => (
        <Col key={category.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
          {renderItem(category)}
        </Col>
      ))
    ) : (
      <LottieHandler type="empty" message={emptyMessage} />
    );
  return <Row>{CategoriesList}</Row>;
};

export default GridList;
