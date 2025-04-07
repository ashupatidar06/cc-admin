import React, { useEffect, useState } from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { MotionCultFormValues } from "../../models/MotionCult.model";
import MotionCultFormLayout from "../../components/MotionCultFormLayout";
import { object, string, array } from "yup";
import { useAddMotionCultMutation, useGetMotionCultQuery } from "../../service/MotionCultServices";
import { showToast } from "src/utils/showToaster";

const AddMotionCultFormWrapper = () => {
  const [addMotionCult, { isLoading: addLoading }] = useAddMotionCultMutation();
  const { data, isLoading, isFetching } = useGetMotionCultQuery("");

  const [cultData, setCultData] = useState<any>({});

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setCultData(data?.data);
    }
  }, [data, isLoading, isFetching]);
  console.log(cultData, "cultData")
  const initialValues: MotionCultFormValues = {
    body: cultData?.body || "",
    Dilemma: {
      title: cultData?.Dilemma?.title || "",
      body: cultData?.Dilemma?.body || "",
    },
    motion: {
      title: cultData?.motion?.title || "",
      body: cultData?.motion?.body || "",
    },
    quoteTitle: cultData?.quoteTitle || "",
    carousel: cultData?.carousel || [],
    workImg: cultData?.workImg || [],
  };

  const validationSchema = object().shape({
    body: string().required("Please enter body"),
    Dilemma: object()
      .shape({
        title: string().required("Please enter dilemma title"),
        body: string().required("Please enter dilemma body"),
      })
      .required(),
    motion: object()
      .shape({
        title: string().required("Please enter motion title"),
        body: string().required("Please enter motion body"),
      })
      .required(),
    quoteTitle: string().required("Please enter quote title"),
    carousel: array()
      .of(string().required("Carousel item cannot be empty"))
      .required("Please add at least one carousel item"),
    workImg: array()
      .of(
        object().shape({
          image_path: string().required("Image path is required"),
          org_path: string().required("Original path is required"),
        })
      )
      .required("Please add at least one work image"),
  });

  const handleSubmit = async (
    values: MotionCultFormValues,
    { resetForm, setSubmitting }: FormikHelpers<MotionCultFormValues>
  ) => {
    try {
      // Deep copy and remove `_id` from each workImg
      const cleanedValues: MotionCultFormValues = {
        ...values,
        workImg: values.workImg.map(({ image_path, org_path }) => ({
          image_path,
          org_path,
        })),
      };

      await addMotionCult(cleanedValues).then((res) => {
        if (res?.data?.status) {
          showToast("success", "Data added successfully");
        } else {
          showToast("error", res?.data?.message);
        }
      });

      resetForm();
    } catch (err) {
      console.error(err);
      showToast("error", "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <Formik<MotionCultFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(formikProps) => (
        <Form>
          <MotionCultFormLayout
            formikProps={formikProps}
            onClose={() => { }}
            isLoading={addLoading}
            isFetching={isLoading}
            type="ADD"
          />
        </Form>
      )}
    </Formik>
  );
};

export default AddMotionCultFormWrapper;
