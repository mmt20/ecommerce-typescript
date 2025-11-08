import { Heading } from "@components/common";
import { Col, Row, Button, Form, Spinner } from "react-bootstrap";
import { Input } from "@components/Form";
import { Navigate } from "react-router";
import useRegister from "@hooks/useRegister";

const Register = () => {
  const {
    accessToken,
    emailAvailabilityStatus,
    emailOnBlurHandler,
    error,
    formErrors,
    handleSubmit,
    loading,
    register,
    submitForm,
  } = useRegister();
  if (accessToken) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input label="First Name" name="firstName" register={register} error={formErrors.firstName?.message} />
            <Input label="Last Name" name="lastName" register={register} error={formErrors.lastName?.message} />
            <Input
              name="email"
              label="Email"
              type="email"
              register={register}
              error={
                formErrors.email?.message
                  ? formErrors.email?.message
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
              error={formErrors.password?.message}
            />
            <Input
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              register={register}
              error={formErrors.confirmPassword?.message}
            />
            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={emailAvailabilityStatus === "checking" ? true : loading === "pending" ? true : false}
            >
              {loading === "pending" ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Loading...
                </>
              ) : (
                "Register"
              )}
            </Button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
