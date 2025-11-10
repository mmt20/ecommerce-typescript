import { Heading } from "@components/common";
import { Modal, Table } from "react-bootstrap";
import { Loading } from "@components/feedback";
import ProductInfo from "@components/ProductInfo/ProductInfo";
import useOrder from "@hooks/useOrder";

const Orders = () => {
  const { orderList, error, loading, showModal, selectedProduct, closeModalHandler, viewDetailsHandler } = useOrder();
  return (
    <div>
      <Modal show={showModal} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Products Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              quantity={el.quantity}
              direction="column"
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Modal.Body>
      </Modal>

      <Heading title="My Order" />
      <Loading status={loading} error={error} type="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((el) => (
              <tr key={el.id}>
                <td>#{el.id}</td>
                <td>
                  {el.items.length} item(s)
                  {" / "}
                  <span
                    onClick={() => viewDetailsHandler(el.id)}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Product Details
                  </span>
                </td>
                <td>{el.subTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </div>
  );
};

export default Orders;
