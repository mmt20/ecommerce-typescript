import { Form } from "react-bootstrap";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps<TFiledValue extends FieldValues> = {
  name: Path<TFiledValue>;
  label: string;
  type?: string;
  register: UseFormRegister<TFiledValue>;
  error: string;
};

const Input = <TFiledValue extends FieldValues>({
  label,
  type = "text",
  register,
  name,
  error,
}: InputProps<TFiledValue>) => {
  return (
    <Form.Group className="mb-3" controlId="firstName">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} placeholder="Enter First Name" {...register(name)} isInvalid={error ? true : false} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default Input;
