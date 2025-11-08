import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { useNavigate, useSearchParams } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInType } from "@validations/signInSchema";
import { Heading } from "@components/common";
import Input from "@components/Form/Input/Input";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const submitForm: SubmitHandler<signInType> = async (data) => {
    if (searchParams.get("message")) {
      setSearchParams({});
    }
    await dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">Your account has been created successfully. Please log in.</Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input name="email" label="Email Address" register={register} error={errors.email?.message} />
            <Input
              type="password"
              name="password"
              label="Password"
              register={register}
              error={errors.password?.message}
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
