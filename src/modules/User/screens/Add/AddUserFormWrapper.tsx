import React from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { UserFormValues } from "../../models/User.model";
import UserFormLayout from "../../components/UserFormLayout";
import { object, string } from "yup";
import { useAddUserMutation } from "../../service/UserServices"
import { showToast } from "src/utils/showToaster";

type Props = {
  onClose: () => void;
};

const AddUserFormWrapper = ({ onClose }: Props) => {
  const [addUser] = useAddUserMutation();

  const initialValues: UserFormValues = {
    fullName: "",
    email: "",
    password: "",
    userName: "",
    phone: "",
    userType: "",
    salaryPerDay: "",
    // subsrcriptionStartDate: "",
    // subsrcriptionEndDate: "",
    // isSubscriptionValid: "",
    companyCode: "",
  };

  const validationSchema = object().shape({
    fullName: string().required("Please enter full name"),
    email: string().email().required("Please enter email"),
    password: string().required("Please enter password"),
    userName: string().required("Please enter user name"),
    phone: string().required("Please enter phone"),
    userType: string().required("Please enter user type"),
    salaryPerDay: string().required("Please enter salary per day"),
    // subsrcriptionStartDate: string().required("Please enter subsrcriptionStartDate"),
    // subsrcriptionEndDate: string().required("Please enter subsrcriptionEndDate"),
    // isSubscriptionValid: string().required("Please enter isSubscriptionValid"),
    companyCode: string().required("Please enter companyCode"),
  });

  const handleSubmit = (
    values: UserFormValues,
    { resetForm, setSubmitting }: FormikHelpers<UserFormValues>
  ) => {
    setTimeout(() => {
      addUser(values)
        .then(() => {
          showToast("success", "User added successfully");
          onClose();
          resetForm();
        })
        .catch((err) => {
          console.error(err);
        });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Formik<UserFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <UserFormLayout formikProps={formikProps} onClose={onClose} type="ADD" />
        </Form>
      )}
    </Formik>
  );
};

export default AddUserFormWrapper;
