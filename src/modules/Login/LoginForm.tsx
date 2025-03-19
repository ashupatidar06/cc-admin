import { FormikProps } from "formik";
import { LoginFormInitialValues } from "./LoginFormWrapper";
import ATMTextField from "../../components/atoms/FormElements/ATMTextField/ATMTextField";
import ATMPasswordField from "../../components/atoms/FormElements/ATMPasswordField/ATMPasswordField";
import { ATMButton } from "../../components/atoms/ATMButton/ATMButton";
type Props = {
  formikProps: FormikProps<LoginFormInitialValues>;
};

const LoginForm = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting, handleBlur, errors, touched } =
    formikProps;

  return (
    <>
      <div className="flex flex-col-reverse justify-end h-screen md:p-4 lg:p-4 lg:flex-row bg-primary-95 md:bg-white">
        {/* <div className="p-4 md:p-0 -mt-[30%] md:mt-auto h-fit md:h-full w-full lg:w-1/2"> */}
        <div className="flex items-center justify-center w-full h-full p-8 bg-white rounded-md ">
          <div className="flex flex-col gap-6  md:w-[500px] w-full h-fit">
            <div className="flex flex-col gap-2">
              {/* <div className="text-xl font-bold">  </div> */}
              <p className="text-xl text-black text-center font-bold md:text-3xl uppercase">
                Concept Culture
              </p>
              <i className="font-medium text-center">Login Here!</i>
            </div>

            <div className="flex flex-col gap-4">
              {/* User Name */}
              {/* <div className="">
                <ATMTextField
                  name="userName"
                  value={values.userName}
                  onChange={(e) => setFieldValue("userName", e.target.value)}
                  label="User Name"
                  placeholder="Enter user name"
                  onBlur={handleBlur}
                  isTouched={touched?.userName}
                  errorMessage={errors?.userName}
                  isValid={!errors?.userName}
                />
              </div> */}

              {/* <ATMTextField
                name="companyCode"
                value={values.companyCode}
                onChange={(e) => setFieldValue("companyCode", e.target.value)}
                label="Company Code"
                placeholder="Enter company code"
                onBlur={handleBlur}
                isTouched={touched?.companyCode}
                errorMessage={errors?.companyCode}
                isValid={!errors?.companyCode}
              /> */}

              <ATMTextField
                name="email"
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
                label="Email"
                placeholder="Enter email"
                onBlur={handleBlur}
                isTouched={touched?.email}
                errorMessage={errors?.email}
                isValid={!errors?.email}
              />

              <div className="">
                <ATMPasswordField
                  name="password"
                  value={values.password}
                  placeholder="Enter Password"
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  label="Password"
                  onBlur={handleBlur}
                  isTouched={touched?.password}
                  errorMessage={errors?.password}
                  isValid={!errors?.password}
                />
              </div>
            </div>
            <div>
              <ATMButton
                isLoading={isSubmitting}
                variant="contained"
                type="submit"
              >
                Login
              </ATMButton>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full lg:w-1/2 md:w-1/2  h-screen flex items-center justify-center ">
        <div className="flex flex-col items-center justify-center gap-4 p-4 text-center rounded-lg md:items-start md:text-start md:justify-between login-img">
          <p className="text-4xl text-white md:text-2xl"></p>
          <div className="flex flex-col gap-1">
           
            <p className="text-sm text-neutral-80 md:text-base mt-5">
              <strong className="text-black">At the heart</strong> of our
              organization lies a simple yet profound belief: every brand has a
              story waiting to be told. We understand that in today’s fast-paced
              world, it’s not enough for a brand to simply exist; it must
              resonate, connect, and engage with its audience. Our thought
              paradigm centers around the idea that the journey of a brand is
              intrinsically linked to its cultural heritage, shaping its
              identity and guiding its future.
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default LoginForm;
