import { FormikProps } from "formik";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import MOLFormDialog from "src/components/molecules/MOLFormDialog/MOLFormDialog";
import { UserFormValues } from "../models/User.model";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";
import ATMPasswordField from "src/components/atoms/FormElements/ATMPasswordField/ATMPasswordField";

type Props = {
  formikProps: FormikProps<UserFormValues>;
  onClose: () => void;
  type: "ADD" | "EDIT";
  isLoading?: boolean;
};

const UserFormLayout = ({ formikProps, onClose, type, isLoading }: Props) => {
  const {
    values,
    setFieldValue,
    isSubmitting,
    handleBlur,
    // touched,
    // errors 
  } =
    formikProps;

  return (
    <MOLFormDialog
      title={type === "ADD" ? "Add" : "Update User"}
      onClose={onClose}
      isSubmitting={isSubmitting}
    >
      {isLoading ? (
        <div className="flex justify-center items-center  h-[185px]">
          <ATMCircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-y-2">

          <ATMTextField
            name="fullName"
            value={values.fullName}
            onChange={(e) => setFieldValue("fullName", e.target.value)}
            label="Name"
            placeholder="Enter fullName"
            onBlur={handleBlur}
          // isTouched={touched?.name}
          // errorMessage={errors?.name}
          // isValid={!errors?.name}
          />

          <ATMTextField
            name="email"
            value={values.email}
            onChange={(e) => setFieldValue("email", e.target.value)}
            label="Email"
            placeholder="Enter email"
            onBlur={handleBlur}
          />

          <ATMTextField
            name="email"
            value={values.email}
            onChange={(e) => setFieldValue("email", e.target.value)}
            label="Email"
            placeholder="Enter email"
            onBlur={handleBlur}
          />

          <ATMTextField
            name="userName"
            value={values.userName}
            onChange={(e) => setFieldValue("userName", e.target.value)}
            label="User Name"
            placeholder="Enter userName"
            onBlur={handleBlur}
          />

          <ATMTextField
            name="phone"
            value={values.phone}
            onChange={(e) => setFieldValue("phone", e.target.value)}
            label="Mobile Number"
            placeholder="Enter mobile number"
            onBlur={handleBlur}
          />

          {"EMPLOYEE" && <ATMTextField
            name="salaryPerDay"
            value={values.salaryPerDay}
            onChange={(e) => setFieldValue("salaryPerDay", e.target.value)}
            label="Salary Per Day"
            placeholder="Enter salary per day"
            onBlur={handleBlur}
          />}

          {/* <ATMTextField
            name="userType"
            value={values.userType}
            onChange={(e) => setFieldValue("userType", e.target.value)}
            label="User Type"
            placeholder="Enter user type"
            onBlur={handleBlur}
          /> */}

          <div>
            <ATMPasswordField
              name="password"
              value={values.password}
              placeholder="Enter Password"
              onChange={(e) => setFieldValue("password", e.target.value)}
              label="Password"
              onBlur={handleBlur}
            // isTouched={touched?.password}
            // errorMessage={errors?.password}
            // isValid={!errors?.password}
            />
          </div>


        </div>
      )}
    </MOLFormDialog>
  );
};

export default UserFormLayout;
