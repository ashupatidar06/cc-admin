import React from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { CultureOfMarketingFormValues } from "../../models/CultureOfMarketing.model";
import CultureOfMarketingLayout from "../../components/CultureOfMarketingLayout";
import { object, string, array } from "yup";
import { useAddUserMutation } from "../../service/UserServices";
import { showToast } from "src/utils/showToaster";

const AddUserFormWrapper = () => {
  const [addUser] = useAddUserMutation();

  const initialValues: CultureOfMarketingFormValues = {
    data: [
      {
        title: "",
        subTitle: "",
        link: "",
        description: "",
        image_path: "",
      },
    ],
  };

  const validationSchema = object().shape({
    data: array().of(
      object().shape({
        title: string().required("Title is required"),
        subTitle: string().required("Subtitle is required"),
        link: string().url("Invalid URL format").required("Link is required"),
        description: string().required("Description is required"),
        image_path: string().required("Image path is required"),
      })
    ),
  });

  const handleSubmit = (
    values: CultureOfMarketingFormValues,
    { resetForm, setSubmitting }: FormikHelpers<CultureOfMarketingFormValues>
  ) => {
    setTimeout(() => {
      addUser(values)
        .then(() => {
          showToast("success", "User added successfully");
          resetForm();
        })
        .catch((err) => {
          console.error(err);
        });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Formik<CultureOfMarketingFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <CultureOfMarketingLayout
            formikProps={formikProps}
            onClose={() => {}}
            type="ADD"
          />
        </Form>
      )}
    </Formik>
  );
};

export default AddUserFormWrapper;
