import React, { useEffect } from "react";
import { FormikProps } from "formik";
import { ATMButton } from "src/components/atoms/ATMButton/ATMButton";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";
import ATMTextArea from "src/components/atoms/FormElements/ATMTextArea/ATMTextArea";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import { useUploadFileMutation } from "src/services/AuthServices";
import { IconCamera } from "@tabler/icons-react";

type Props = {
  formikProps: FormikProps<any>;
  onClose: () => void;
  type: "ADD" | "EDIT";
  isLoading?: boolean;
  isFetching?: boolean
};

const MotionCultFormLayout = ({
  formikProps,
  onClose,
  type,
  isLoading,
  isFetching
}: Props) => {
  const { values, setFieldValue, isSubmitting, handleBlur, handleSubmit } =
    formikProps;
  const [uploadFile, { isLoading: imgIsloading }] = useUploadFileMutation();

  console.log("values", values)
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
    fieldName: any,
    index: number
  ) => {
    const file = event.currentTarget.files?.[0] || null;
    if (!file) return;

    const sanitizedFileName = file.name.replace(/\s+/g, "_");
    const newFile = new File([file], sanitizedFileName, { type: file.type });

    // setFieldValue(fieldName, newFile);

    const formData = new FormData();
    formData.append("file", newFile);
    formData.append("folder", "motionCult");
    console.log("response?.fileUrl", fieldName)

    try {
      const response = await uploadFile({
        body: formData,
        fileName: fieldName,
      }).unwrap();
      if (response?.fileUrl) {
        if (fieldName === "carousel") {

          const updateImg = [...values?.carousel]
          updateImg[index] = response.fileUrl
          setFieldValue("carousel", [...updateImg]);
        } else if (fieldName === "workImg") {

          const updateWorkImg = [...values?.workImg]
          updateWorkImg[index] = response.fileUrl

          console.log("updateWorkImg", updateWorkImg)
          setFieldValue("workImg", [...updateWorkImg]);
        }
      }
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
    }
  };

  useEffect(() => {

  }, [values?.carousel, values?.workImg])

  return (
    <>
      {isFetching ? (
        <div className="flex justify-center items-center h-[185px]">
          <ATMCircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-y-6 p-6 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between border-b-2 pb-4 border-black">
            <h3 className="text-lg font-bold">MOTION CULT FORM</h3>
            <ATMButton
              extraClasses="-mt-1 mr-4"
              autoFocus
              onClick={handleSubmit}
              color="primary"
              disabled={isLoading}
            >
              {"Save"}
            </ATMButton>
          </div>

          {/* Body */}
          <ATMTextArea
            name="body"
            value={values.body}
            onChange={(e) => setFieldValue("body", e.target.value)}
            label="Body"
            placeholder="Enter body"
            onBlur={handleBlur}
          />

          {/* Sections: Dilemma and Motion */}
          {["Dilemma", "motion"].map((section) => (
            <div key={section} className="border p-4 rounded-lg mb-4 bg-white shadow">
              <h4 className="text-lg font-bold text-gray-700 mb-2 capitalize">
                {section}
              </h4>

              <ATMTextField
                name={`${section}.title`}
                value={values[section]?.title || ""}
                placeholder="Enter Title"
                onChange={(e) => setFieldValue(`${section}.title`, e.target.value)}
                label="Title"
                onBlur={handleBlur}
              />

              <ATMTextArea
                name={`${section}.body`}
                value={values[section]?.body || ""}
                placeholder="Enter Body"
                onChange={(e) => setFieldValue(`${section}.body`, e.target.value)}
                label="Body"
                onBlur={handleBlur}
              />
            </div>
          ))}

          {/* Quote Title */}
          <ATMTextField
            name="quoteTitle"
            value={values.quoteTitle}
            onChange={(e) => setFieldValue("quoteTitle", e.target.value)}
            label="Quote Title"
            placeholder="Enter quote title"
            onBlur={handleBlur}
          />

          {/* Carousel Images */}
          <div className="border p-4 rounded-lg mb-4 bg-white shadow">
            <h4 className="text-lg font-bold text-gray-700 mb-2">Carousel Images</h4>



            {/* Image Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values?.carousel?.map((img: string, index: number) => (
                <div key={index} className="h-48 w-full p-1 flex items-center justify-center border relative rounded-lg overflow-hidden">

                  {/* Hidden File Input */}
                  <input
                    id={`carousel-file-upload-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleFileChange(event, setFieldValue, "carousel", index)}
                    className="hidden"
                  />

                  {/* Camera Icon as Upload Button */}
                  <label
                    htmlFor={`carousel-file-upload-${index}`}
                    className="cursor-pointer absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg"
                  >
                    <IconCamera className="h-8 w-8 text-gray-600" />
                  </label>

                  {/* Image Preview */}
                  {img ? (
                    <img
                      src={img}
                      alt={`carousel-image-${index}`}
                      className="h-full w-full object-cover rounded"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>


          {/* Work Images */}
          <div className="border p-4 rounded-lg mb-4 bg-white shadow">
            <h4 className="text-lg font-bold text-gray-700 mb-2">Work Section</h4>
            {imgIsloading ? <ATMCircularProgress /> : null}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {values?.workImg?.map((img: string, index: number) => (
                <div key={index} className="h-48 w-full p-1 flex items-center justify-center border relative rounded-lg overflow-hidden">

                  {/* Hidden File Input */}
                  <input
                    id={`workImg-file-upload-${index}`}
                    type="file"
                    accept="image/*,video/*"
                    onChange={(event) => handleFileChange(event, setFieldValue, "workImg", index)}
                    className="hidden"
                  />

                  {/* Camera Icon as Upload Button */}
                  <label
                    htmlFor={`workImg-file-upload-${index}`}
                    className="cursor-pointer absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg"
                  >
                    <IconCamera className="h-8 w-8 text-gray-600" />
                  </label>

                  {/* Image Preview */}
                  {img.endsWith('.mp4') || img.endsWith('.webm') || img.endsWith('.ogg') ? (
                    <video
                      src={img}
                      className="h-full w-full object-cover rounded"
                      controls
                    />
                  ) : (
                    <img
                      src={img}
                      alt={`workimg-image-${index}`}
                      className="h-full w-full object-cover rounded"
                    />
                  )}


                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default MotionCultFormLayout;
