import React from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { object, string } from "yup";
import { useAddCooMutation, useGetCooQuery } from "../../service/CultureOfOriginServices";
import { showToast } from "src/utils/showToaster";
import CultureOfOriginLayout from "../../components/CultureOfOriginLayout";
import { CultureOfOriginFormValues } from "../../models/CultureOfOrigin.model";

const AddCultureOfOriginWrapper = () => {
  const [addCultureOfOrigin] = useAddCooMutation();
  const { data } = useGetCooQuery("")

  const initialValues: CultureOfOriginFormValues = {
    // title: data?.data?.title,
    body: data?.data?.body,
    theChallenge: { img: data?.data?.theChallenge?.img, title: data?.data?.theChallenge?.title, body: data?.data?.theChallenge?.body },
    theResearch: { img: data?.data?.theResearch?.img, title: data?.data?.theResearch?.title, body: data?.data?.theResearch?.body },
    theSolution: { img: data?.data?.theSolution?.img, title: data?.data?.theSolution?.title, body: data?.data?.theSolution?.body },
    quote: { img: data?.data?.quote?.img, title: data?.data?.quote?.title },
  };

  const validationSchema = object().shape({
    // title: string().required("Title is required"),
    body: string().required("Body is required"),
    theChallenge: object().shape({
      img: string().url("Invalid URL format").required("Image is required"),
      title: string().required("Title is required"),
      body: string().required("Body is required"),
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
    quote: object().shape({
      img: string().url("Invalid URL format").required("Image is required"),
      title: string().required("Title is required"),
    }),
  });

  const handleSubmit = async (
    values: CultureOfOriginFormValues,
    { resetForm, setSubmitting }: FormikHelpers<CultureOfOriginFormValues>
  ) => {
    try {
      await addCultureOfOrigin(values).then((res) => {
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
    <Formik<CultureOfOriginFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(formikProps) => (
        <Form>
          <CultureOfOriginLayout
            formikProps={formikProps}
            onClose={() => { }}
            type="ADD"
          />
        </Form>
      )}
    </Formik>
  );
};

export default AddCultureOfOriginWrapper;
