import { Form, Formik, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { object, string } from "yup";
import LoginForm from "./LoginForm";

import { Navigate, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import {
  setAccessToken,
  setIsLogin,
  setRefreshToken,
  setUserData,
} from "../../slices/AuthSlice";
import {
  authTokenKeyName,
  refreshTokenKeyName,
} from "../../utils/configs/authConfig";
import { useLoginMutation } from "../../services/AuthServices";
import { showToast } from "../../utils/showToaster";

export type LoginFormInitialValues = {
  // companyCode: string;
  email: string;
  // userName: string;
  password: string;
};

const LoginFormWrapper = () => {
  const { isLogin } = useSelector((state: RootState) => state?.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const afterLogin = (res: any) => {
    const userData = {
      userName: res?.user?.userName,
      userId: res?.user?._id,
      userType: res?.user?.userType,
      email: res?.user?.email,
      // name: res?.data?.user?.name,
      // mobile: res?.user?.mobile,
    };

    dispatch(setUserData(userData));
    dispatch(setIsLogin(true));
    dispatch(setAccessToken(res?.accessToken));
    dispatch(setRefreshToken(res?.refreshToken));

    localStorage.setItem(authTokenKeyName, res?.accessToken);
    localStorage.setItem(refreshTokenKeyName, res?.refreshToken);
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("deviceId", res?.deviceId);
    localStorage.setItem("userData", JSON.stringify(userData));

    navigate("/");
    // navigate(returnUrl ? `/${returnUrl}` : "/");
  };

  const [login] = useLoginMutation();

  const initialValues: LoginFormInitialValues = {
    // companyCode: "",
    email: "",
    // userName: "",
    password: "",
  };

  const validationSchema = object({
    // companyCode: string().required("Please enter company code"),
    email: string().email().required("Please enter user name"),
    // userName: string().required("Please enter user name"),
    password: string().required("Password is required"),
  });

  const handleSubmit = (
    values: LoginFormInitialValues,
    { setSubmitting }: FormikHelpers<LoginFormInitialValues>
  ) => {
    setSubmitting(true);
    login(values).then((res: any) => {
      setSubmitting(false);
      if (res.error) {
        showToast("error", res?.error?.data?.message);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          afterLogin(res?.data?.data);
        } else {
          showToast("error", res?.data?.message);
        }
      }
    });
  };

  if (isLogin) {
    return <Navigate to="/user" />;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            <LoginForm formikProps={formikProps} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginFormWrapper;
