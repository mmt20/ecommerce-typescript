import { TProduct } from "./product.types";

export type TOrderItem = {
  id: number;
  userId: number;
  subTotal: number;
  items: TProduct[];
};
