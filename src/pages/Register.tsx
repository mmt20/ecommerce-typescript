import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type signUpType } from "@validations/signUpSchema";
import { Heading } from "@components/common";
import { Col, Row, Button, Form } from "react-bootstrap";
import Input from "@components/Form/Input/Input";

const fields: {
  name: keyof signUpType;
  label: string;
  type?: string;
}[] = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password" },
];

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const submitForm: SubmitHandler<signUpType> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            {fields.map(({ name, label, type }) => (
              <Input
                key={name}
                name={name}
                label={label}
                type={type}
                register={register}
                error={errors[name]?.message || ""}
              />
            ))}
            <Button variant="info" type="submit" style={{ color: "white" }}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
