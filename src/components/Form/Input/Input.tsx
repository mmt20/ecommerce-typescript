import { Form } from "react-bootstrap";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps<TFiledValue extends FieldValues> = {
  name: Path<TFiledValue>;
  label: string;
  type?: string;
  register: UseFormRegister<TFiledValue>;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disabled?: boolean;
};

const Input = <TFiledValue extends FieldValues>({
  label,
  type = "text",
  register,
  name,
  error,
  onBlur,
  formText,
  success,
  disabled,
}: InputProps<TFiledValue>) => {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder="Enter First Name"
        {...register(name)}
        onBlur={onBlurHandler}
        isInvalid={error ? true : false}
        isValid={success ? true : false}
        disabled={disabled}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
      {formText && <Form.Text muted>{formText}</Form.Text>}
    </Form.Group>
  );
};

export default Input;
