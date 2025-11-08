import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type signUpType } from "@validations/signUpSchema";
import { Heading } from "@components/common";
import { Col, Row, Button, Form } from "react-bootstrap";
import { Input } from "@components/Form";

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
  const emailOnBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(e);
  };
  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input label="First Name" name="firstName" register={register} error={errors.firstName?.message} />
            <Input label="Last Name" name="lastName" register={register} error={errors.lastName?.message} />
            <Input
              name="email"
              label="Email"
              type="email"
              register={register}
              error={errors.email?.message}
              onBlur={emailOnBlurHandler}
            />
            <Input
              name="password"
              label="Password"
              type="password"
              register={register}
              error={errors.password?.message}
            />
            <Input
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              register={register}
              error={errors.confirmPassword?.message}
            />
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
