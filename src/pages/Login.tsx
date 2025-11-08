import { Navigate } from "react-router";

import { Heading } from "@components/common";
import Input from "@components/Form/Input/Input";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import useLogin from "@hooks/useLogin";

const Login = () => {
  const { accessToken, searchParams, handleSubmit, submitForm, register, formErrors, loading, error } = useLogin();
  if (accessToken) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">Your account has been created successfully. Please log in.</Alert>
          )}
          {searchParams.get("message") === "login_required" && (
            <Alert variant="success">You need to login to see this content.</Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input name="email" label="Email Address" register={register} error={formErrors.email?.message} />
            <Input
              type="password"
              name="password"
              label="Password"
              register={register}
              error={formErrors.password?.message}
            />
            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={loading === "pending" ? true : false}
            >
              {loading === "pending" ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Loading...
                </>
              ) : (
                "Login"
              )}
            </Button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
