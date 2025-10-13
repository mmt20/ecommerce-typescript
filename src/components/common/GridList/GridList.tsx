import { Col, Row } from "react-bootstrap";
import { TCategory } from "../../../types/category";

type GridListProps = {
  records: TCategory[];
  renderItem: (record: TCategory) => React.ReactNode;
};

const GridList = ({ records, renderItem }: GridListProps) => {
  const CategoriesList =
    records.length > 0
      ? records.map((category) => (
          <Col key={category.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
            {renderItem(category)}
          </Col>
        ))
      : "there are no categories";
  return <Row>{CategoriesList}</Row>;
};

export default GridList;
