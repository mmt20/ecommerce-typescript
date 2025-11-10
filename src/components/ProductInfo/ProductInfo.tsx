import styles from "./styles.module.css";
type ProductInfoProps = {
  title: string;
  price: number;
  quantity?: number;
  direction?: "row" | "column";
  img: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const ProductInfo = ({ title, img, price, direction = "row", quantity, children, style }: ProductInfoProps) => {
  return (
    <div className={`${styles[`product-${direction}`]}`} style={style}>
      <div className={`${styles[`productImg-${direction}`]}`}>
        <img src={img} alt={title} />
      </div>
      <div className={`${styles[`productInfo-${direction}`]}`}>
        <h2 title={title}>{title}</h2>
        <h3>{price.toFixed(2)} EGP</h3>
        {quantity && <h3>Quantity: {quantity}</h3>}
        {quantity && <h3>Total Price: {(price * quantity).toFixed(2)} EGP</h3>}
        {children}
      </div>
    </div>
  );
};

export default ProductInfo;
