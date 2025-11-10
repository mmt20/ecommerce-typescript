import type { TLoadingStatus } from "@types";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";
import TableSkeleton from "../skeletons/TableSkeleton/TableSkeleton";

const skeletonTypes = {
  product: ProductSkeleton,
  cart: CartSkeleton,
  category: CategorySkeleton,
  table: TableSkeleton,
};

type LoadingProps = {
  status: TLoadingStatus;
  error: string | null;
  children: React.ReactNode;
  type?: keyof typeof skeletonTypes;
};

const Loading = ({ status, error, children, type = "category" }: LoadingProps) => {
  const Component = skeletonTypes[type];

  if (status === "pending") {
    return (
      <div>
        <Component />
      </div>
    );
  }
  if (status === "failed") {
    return (
      <div>
        <LottieHandler type="error" message={error as string} />
      </div>
    );
  }

  return <>{children}</>;
};

export default Loading;
