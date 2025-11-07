import { Heading } from "@components/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type signInType } from "@validations/signInSchema";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import Input from "@components/Form/Input/Input";

const fields: { name: keyof signInType; label: string; type?: string }[] = [
  { name: "email", label: "Email address", type: "email" },
  { name: "password", label: "Password", type: "password" },
];

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const submitForm: SubmitHandler<signInType> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Heading title="Login" />
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

export default Login;
