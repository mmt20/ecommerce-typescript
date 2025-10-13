import type { TLoadingStatus } from "src/types/shared";

type LoadingProps = {
  status: TLoadingStatus;
  error: string | null;
  children: React.ReactNode;
};

const Loading = ({ status, error, children }: LoadingProps) => {
  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return <>{children}</>;
};

export default Loading;
