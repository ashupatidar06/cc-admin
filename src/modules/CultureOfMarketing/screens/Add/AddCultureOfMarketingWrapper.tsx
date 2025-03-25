import React from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { object, string } from "yup";
import { useAddComMutation, useGetComQuery } from "../../service/CultureOfMarketingServices";
import { showToast } from "src/utils/showToaster";
import CultureOfMarketingLayout from "../../components/CultureOfMarketingLayout";
import { CultureOfMarketingFormValues } from "../../models/CultureOfMarketing.model";

const AddCultureOfMarketingWrapper = () => {
  const [addCultureOfMarketing] = useAddComMutation();
  const { data, isFetching, isLoading } = useGetComQuery("")
  console.log(data, "aagya")
  const initialValues: CultureOfMarketingFormValues = {
    // title: data?.data?.title,
    body: data?.data?.body,
    theChallenge: { img: data?.data?.theChallenge?.img, title: data?.data?.theChallenge?.title, body: data?.data?.theChallenge?.body },
    middleBanner: { img: data?.data?.middleBanner?.img, title: data?.data?.middleBanner?.title },
    theResearch: { img: data?.data?.theResearch?.img, title: data?.data?.theResearch?.title, body: data?.data?.theResearch?.body },
    theSolution: { img: data?.data?.theSolution?.img, title: data?.data?.theSolution?.title, body: data?.data?.theSolution?.body },
  };

  const validationSchema = object().shape({
    // title: string().required("Title is required"),
    body: string().required("Body is required"),
    theChallenge: object().shape({
      img: string().url("Invalid URL format").required("Image is required"),
      title: string().required("Title is required"),
      body: string().required("Body is required"),
    }),
    middleBanner: object().shape({
      img: string().url("Invalid URL format").required("Image is required"),
      title: string().required("Title is required"),
    }),
    theResearch: object().shape({
      img: string().url("Invalid URL format").required("Image is required"),
      title: string().required("Title is required"),
      body: string().required("Body is required"),
    }),
    theSolution: object().shape({
      img: string().url("Invalid URL format").required("Image is required"),
      title: string().required("Title is required"),
      body: string().required("Body is required"),
    }),
  });

  const handleSubmit = async (
    values: CultureOfMarketingFormValues,
    { resetForm, setSubmitting }: FormikHelpers<CultureOfMarketingFormValues>
  ) => {
    try {
      await addCultureOfMarketing(values).then((res) => {
        if (res?.data?.status) {

          showToast("success", "Data added successfully");
        } else {
          showToast("error", res?.data?.message);

        }
      })
      resetForm();
    } catch (err) {
      console.error(err);
      showToast("error", "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<CultureOfMarketingFormValues>

      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(formikProps) => (
        <Form>
          <CultureOfMarketingLayout
            formikProps={formikProps}
            onClose={() => { }}
            type="ADD"
          />
        </Form>
      )}
    </Formik>
  );
};

export default AddCultureOfMarketingWrapper;
