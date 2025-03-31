import React, { useEffect, useState } from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { MotionCultFormValues } from "../../models/MotionCult.model";
import MotionCultFormLayout from "../../components/MotionCultFormLayout";
import { object, string, array } from "yup";
import { useAddMotionCultMutation, useGetMotionCultQuery } from "../../service/MotionCultServices";
import { showToast } from "src/utils/showToaster";

// type Props = {
//   onClose: () => void;
// };

const AddMotionCultFormWrapper = () => {
  const [addMotionCult, { isLoading: addLoading }] = useAddMotionCultMutation();
  const { data, isLoading, isFetching } = useGetMotionCultQuery("")

  const [cultData, setCultData] = useState<any>({})

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setCultData(data?.data)
    }

  }, [data, isLoading, isFetching]);
  console.log(cultData, "cultData")
  const initialValues: MotionCultFormValues = {
    body: cultData?.body,
    Dilemma: {
      title: cultData?.Dilemma?.title,
      body: cultData?.Dilemma?.body,
    },
    motion: {
      title: cultData?.motion?.title,
      body: cultData?.motion?.body,
    },
    quoteTitle: cultData?.quoteTitle,
    carousel: cultData?.carousel,
    workImg: cultData?.workImg,
  };

  const validationSchema = object().shape({
    body: string().required("Please enter body"),
    Dilemma: object().shape({
      title: string().required("Please enter dilemma title"),
      body: string().required("Please enter dilemma body"),
    }).required(),
    motion: object().shape({
      title: string().required("Please enter motion title"),
      body: string().required("Please enter motion body"),
    }).required(),
    quoteTitle: string().required("Please enter quote title"),
    carousel: array().of(string()).required("Please add at least one carousel item"),
    workImg: array().of(string()).required("Please add at least one work image"),
  });

  const handleSubmit = async (
    values: MotionCultFormValues,
    { resetForm, setSubmitting }: FormikHelpers<MotionCultFormValues>
  ) => {
    try {
      await addMotionCult(values).then((res) => {
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
    <Formik<MotionCultFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(formikProps) => (
        <Form>
          <MotionCultFormLayout formikProps={formikProps}
            onClose={() => { }}
            isLoading={addLoading}
            isFetching={isLoading}

            type="ADD" />
        </Form>
      )}
    </Formik>
  );
};

export default AddMotionCultFormWrapper;
