import React from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { object, string, array } from "yup";
import { useAddstoryMutation, useGetstoryQuery } from "../../service/StoryServices";
import { showToast } from "src/utils/showToaster";
import StoryLayout from "../../components/StoryLayout"; // Make sure this matches your new layout
import { StoryFormValues } from "../../models/Story.model";

const AddStoryWrapper = () => {
  const [addStory] = useAddstoryMutation();
  const { data } = useGetstoryQuery("");

  const initialValues: StoryFormValues = {
    data: data?.data?.data || [
      {
        title: "",
        image: "",
        body: "",
        date: ""
      },
    ],
  };

  const validationSchema = object().shape({
    data: array().of(
      object().shape({
        title: string().required("Title is required"),
        image: string().url("Invalid image URL").required("Image is required"),
        body: string().required("Body is required"),
      })
    ).min(1, "At least one story is required"),
  });

  const handleSubmit = async (
    values: StoryFormValues,
    { resetForm, setSubmitting }: FormikHelpers<StoryFormValues>
  ) => {
    try {
      const cleanedData = values.data.map(({ _id, date, ...rest }) => rest);

      const response = await addStory({ data: cleanedData });

      if (response?.data?.status) {
        showToast("success", "Story saved successfully!");
        resetForm();
      } else {
        showToast("error", response?.data?.message || "Failed to save story.");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<StoryFormValues>
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

export default AddStoryWrapper;
