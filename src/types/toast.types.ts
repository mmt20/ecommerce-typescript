export type TToast = {
  id?: string;
  message: string | null;
  type: "primary" | "success" | "info" | "warning" | "danger";
  title?: string;
  displayAppearance?: boolean;
};
