import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  useAddSwipeCardsMutation,
  useFileGetDataQuery,
  useUploadFileMutation,
} from "src/services/AuthServices";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";

interface SwipeViewFormValues {
  connectCultureImg: File | string | null;
  cultureOfMarketImg: File | string | null;
  cultureOfOriginImg: File | string | null;
  motionCultImg: File | string | null;
  storiesImg: File | string | null;
  exploreImg: File | string | null;
}

const SwipeView: React.FC = () => {
  const [uploadFile] = useUploadFileMutation();
  const [addSwipeCard] = useAddSwipeCardsMutation();
  const { data, isLoading } = useFileGetDataQuery("");
  const [uploadingField, setUploadingField] = useState<keyof SwipeViewFormValues | null>(null);

  const [formValues, setFormValues] = useState<SwipeViewFormValues>({
    connectCultureImg: null,
    cultureOfMarketImg: null,
    cultureOfOriginImg: null,
    motionCultImg: null,
    storiesImg: null,
    exploreImg: null,
  });

  useEffect(() => {
    if (data?.data && !isLoading) {
      setFormValues({
        connectCultureImg: data.data.connectCultureImg || null,
        cultureOfMarketImg: data.data.cultureOfMarketImg || null,
        cultureOfOriginImg: data.data.cultureOfOriginImg || null,
        motionCultImg: data.data.motionCultImg || null,
        storiesImg: data.data.storiesImg || null,
        exploreImg: data.data.exploreImg || null,
      });
    }
  }, [data, isLoading]);

  const validationSchema = Yup.object().shape({
    connectCultureImg: Yup.mixed().required("Required"),
    cultureOfMarketImg: Yup.mixed().required("Required"),
    cultureOfOriginImg: Yup.mixed().required("Required"),
    motionCultImg: Yup.mixed().required("Required"),
    storiesImg: Yup.mixed().required("Required"),
    exploreImg: Yup.mixed().required("Required"),
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: FormikHelpers<SwipeViewFormValues>["setFieldValue"],
    fieldName: keyof SwipeViewFormValues
  ) => {
    const file = event.currentTarget.files?.[0] || null;
    if (!file) return;

    const sanitizedFileName = file.name.replace(/\s+/g, "_");
    const newFile = new File([file], sanitizedFileName, { type: file.type });

    setFieldValue(fieldName, newFile);
    setUploadingField(fieldName);

    const formData = new FormData();
    formData.append("file", newFile);
    formData.append("folder", "swipecards");

    try {
      const response = await uploadFile({
        body: formData,
        fileName: fieldName,
      }).unwrap();

      if (response?.fileUrl) {
        setFieldValue(fieldName, response.fileUrl);
        setFormValues((prev) => ({
          ...prev,
          [fieldName]: response.fileUrl,
        }));
        addSwipeCard({
          body: {
            ...formValues,
            [fieldName]: response.fileUrl,
          },
        });
      }
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = (values: SwipeViewFormValues) => {
    console.log("Form Submitted:", values);
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen rounded-xl">
      <h2 className="text-3xl uppercase font-bold mb-4 py-4">Swipe Cards :</h2>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form className="grid grid-cols-2 gap-12">
            {Object.keys(formValues).map((fieldName) => {
              const typedFieldName = fieldName as keyof SwipeViewFormValues;

              return (
                <div
                  key={typedFieldName}
                  className="flex flex-col shadow-lg border-4 border-gray-400 rounded-lg p-2"
                >
                  <label className="uppercase text-xl font-bold py-2">
                    {fieldName.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleFileChange(event, setFieldValue, typedFieldName)
                    }
                    className="border p-2 rounded"
                  />
                  <ErrorMessage
                    name={typedFieldName}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <div className="h-84 w-full p-1 flex items-center justify-center border">
                    {uploadingField === typedFieldName ? (
                      <ATMCircularProgress />
                    ) : formValues[typedFieldName] ? (
                      <img
                        src={formValues[typedFieldName] as string}
                        alt=""
                        className="h-full w-full object-fill"
                      />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </div>
                </div>
              );
            })}
            {/* Optional Submit Button if needed later */}
            {/* <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 col-span-2"
            >
              Submit
            </button> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SwipeView;
