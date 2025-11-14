import style from "./styles.module.css";
import { useAppSelector } from "@store/hooks";
import ToastItem from "./ToastItem";

const { toastList } = style;

const ToastList = () => {
  const { records } = useAppSelector((state) => state.toasts);
  return (
    <div className={toastList}>
      {records.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastList;
