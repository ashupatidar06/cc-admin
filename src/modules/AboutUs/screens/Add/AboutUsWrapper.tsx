import React from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { object, string, array } from "yup";
import { useAddAboutUsMutation, useGetAboutUsQuery } from "../../service/AboutUsServices";
import { showToast } from "src/utils/showToaster";
import AboutUsLayout from "../../components/AboutUsLayout";
import { AboutUsFormValues } from "../../models/AboutUs.model";

const AddAboutUsWrapper = () => {
  const [addAboutUs] = useAddAboutUsMutation();
  const { data } = useGetAboutUsQuery("")
  const initialValues: AboutUsFormValues = {
    // title: data?.data?.title,
    body: data?.data?.body,
    aboutUs: data?.data?.aboutUs,
    team: data?.data?.team?.map((ele: any) => {
      return { name: ele?.name, link: ele?.link, role: ele?.role, profileImage: ele?.profileImage, description: ele?.description }
    })


  };

  const validationSchema = object().shape({
    // title: string().required("Title is required"),
    body: string().required("Body is required"),
    aboutUs: string().required("About Us section is required"),
    team: array().of(
      object().shape({
        name: string().required("Name is required"),
        link: string().url("Invalid URL format"),
        role: string().required("Role is required"),
        profileImage: string().required("Profile Image is required"),
        description: string().required("Description is required"),
      })
    ).min(1, "At least one team member is required"),
  });

  const handleSubmit = async (
    values: AboutUsFormValues,
    { resetForm, setSubmitting }: FormikHelpers<AboutUsFormValues>
  ) => {
    console.log("----------------00000000000----------------")
    try {
      await addAboutUs(values).then((res) => {
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
    <Formik<AboutUsFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(formikProps) => (
        <Form>
          <AboutUsLayout
            formikProps={formikProps}
            onClose={() => { }}
            type="ADD"
          />
        </Form>
      )}
    </Formik>
  );
};

export default AddAboutUsWrapper;
