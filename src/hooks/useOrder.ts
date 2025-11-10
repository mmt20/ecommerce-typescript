import { TProduct } from "@types";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actGetOrders, restOrderStatus } from "@store/order/orderSlice";

const useOrder = () => {
  const dispatch = useAppDispatch();
  const { orderList, error, loading } = useAppSelector((state) => state.order);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  const closeModalHandler = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };
  const viewDetailsHandler = (orderId: number) => {
    const orderDetails = orderList.find((el) => el.id === orderId);
    if (orderDetails) {
      setSelectedProduct((prev) => [...prev, ...orderDetails.items]);
      setShowModal(true);
    }
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(restOrderStatus());
    };
  }, [dispatch]);
  return {
    orderList,
    error,
    loading,
    showModal,
    selectedProduct,
    closeModalHandler,
    viewDetailsHandler,
  };
};

export default useOrder;
