import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import { Footer, Header } from "@components/common";

const { container, wrapper } = styles;
const MainLayout = () => {
  return (
    <Container className={container}>
      <div className={wrapper}>
        <Header />
        <Footer />
      </div>
    </Container>
  );
};

export default MainLayout;
