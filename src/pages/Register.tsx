import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type signUpType } from "@validations/signUpSchema";
import { Heading } from "@components/common";
import { Col, Row, Button, Form } from "react-bootstrap";
import { Input } from "@components/Form";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
const Register = () => {
  const { emailAvailabilityStatus, checkEmailAvailability, enteredEmail, resetCheckEmailAvailability } =
    useCheckEmailAvailability();

  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const submitForm: SubmitHandler<signUpType> = (data) => {
    console.log(data);
  };
  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
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
              error={
                errors.email?.message
                  ? errors.email?.message
                  : emailAvailabilityStatus === "notAvailable"
                  ? "This email is already in use."
                  : emailAvailabilityStatus === "failed"
                  ? "Error from the server."
                  : ""
              }
              onBlur={emailOnBlurHandler}
              formText={
                emailAvailabilityStatus === "checking"
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : ""
              }
              success={emailAvailabilityStatus === "available" ? "This email is available for use." : ""}
              disabled={emailAvailabilityStatus === "checking" ? true : false}
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
