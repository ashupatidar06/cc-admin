import React from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { object, array, string } from "yup";
import { useAddexploreMutation, useGetexploreQuery } from "../../service/ExploreServices";
import { showToast } from "src/utils/showToaster";
import StoryLayout from "../../components/ExploreLayout"; // Keep this matching your layout
import { ExploreFormValues } from "../../models/Explore.model";

const AddExploreWrapper = () => {
  const [addExplore] = useAddexploreMutation();
  const { data } = useGetexploreQuery("");

  const initialValues: ExploreFormValues = {
    collabs: data?.data?.collabs || [""],
    approach: data?.data?.approach || [""],
  };

  const validationSchema = object().shape({
    collabs: array().of(string().required("Collab is required")).min(1, "At least one collab is required"),
    approach: array().of(string().required("Approach is required")).min(1, "At least one approach is required"),
  });

  const handleSubmit = async (
    values: ExploreFormValues,
    { resetForm, setSubmitting }: FormikHelpers<ExploreFormValues>
  ) => {
    try {
      const response = await addExplore(values);

      if (response?.data?.status) {
        showToast("success", "Explore data saved successfully!");
        resetForm();
      } else {
        showToast("error", response?.data?.message || "Failed to save explore data.");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<ExploreFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(formikProps) => (
        <Form>
          <StoryLayout
            formikProps={formikProps}
            onClose={() => { }}
            type="ADD"
          />
        </Form>
      )}
    </Formik>
  );
};

export default AddExploreWrapper;
