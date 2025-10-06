import { Link } from "react-router-dom";
import styles from "./styles.module.css";
const { category, categoryImg, categoryTitle } = styles;

interface IProps {
  title: string;
  prefix: string;
  img: string;
}

const Category = ({ img, prefix, title }: IProps) => {
  return (
    <Link to={`/categories/products/${prefix}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className={category}>
        <div className={categoryImg}>
          <img src={img} alt="" />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </div>
    </Link>
  );
};

export default Category;
