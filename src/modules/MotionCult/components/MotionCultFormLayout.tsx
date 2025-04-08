import React from "react";
import { FormikProps } from "formik";
import { ATMButton } from "src/components/atoms/ATMButton/ATMButton";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";
import ATMTextArea from "src/components/atoms/FormElements/ATMTextArea/ATMTextArea";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import { useUploadFileMutation } from "src/services/AuthServices";
import { IconCamera, IconPlus, IconTrash } from "@tabler/icons-react";

type Props = {
  formikProps: FormikProps<any>;
  onClose: () => void;
  type: "ADD" | "EDIT";
  isLoading?: boolean;
  isFetching?: boolean;
};

const MotionCultFormLayout = ({
  formikProps,
  onClose,
  type,
  isLoading,
  isFetching,
}: Props) => {
  const { values, setFieldValue, isSubmitting, handleBlur, handleSubmit } = formikProps;
  const [uploadFile, { isLoading: imgIsloading }] = useUploadFileMutation();

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

    const formData = new FormData();
    formData.append("file", newFile);
    formData.append("folder", "motionCult");

    try {
      const response = await uploadFile({
        body: formData,
        fileName: fieldName,
      }).unwrap();

      if (response?.fileUrl) {
        if (fieldName === "carousel") {
          const updateImg = [...values?.carousel];
          updateImg[index] = response.fileUrl;
          setFieldValue("carousel", [...updateImg]);
        } else if (fieldName === "workImg") {
          const updatedWorkImgs = [...values.workImg];
          updatedWorkImgs[index] = {
            ...updatedWorkImgs[index],
            image_path: response.fileUrl,
          };
          setFieldValue("workImg", updatedWorkImgs);
        }
      }
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
    }
  };

  const handleAddWorkImg = () => {
    const newWorkImg = { image_path: "", org_path: "" };
    setFieldValue("workImg", [...values.workImg, newWorkImg]);
  };

  const handleRemoveWorkImg = (index: number) => {
    const updated = [...values.workImg];
    updated.splice(index, 1); // Remove the item at index
    setFieldValue("workImg", updated);

  };

  return (
    <>
      {isFetching ? (
        <div className="flex justify-center items-center h-[185px]">
          <ATMCircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-y-6 p-6 bg-slate-100 shadow-lg rounded-lg">
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

          {/* Sections */}
          {["Dilemma", "motion"].map((section) => (
            <div key={section} className="border p-4 rounded-lg mb-4 bg-white shadow">
              <h4 className="text-lg font-bold text-gray-700 mb-2 capitalize">{section}</h4>

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

          {/* Carousel Images Section */}
          <div className="border p-4 rounded-lg mb-4 bg-slate-200 shadow">
            <h4 className="text-lg font-bold text-gray-700 mb-4 flex justify-between items-center uppercase">
              Carousel Images
              <ATMButton
                type="button"
                onClick={() => {
                  setFieldValue("carousel", [...values.carousel, ""]);
                }}
                color="primary"
              >
                + Add Image
              </ATMButton>
            </h4>

            {imgIsloading ? <ATMCircularProgress /> : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values?.carousel?.map((img: string, index: number) => (
                <div
                  key={index}
                  className="relative border rounded-lg p-4 bg-gray-50 shadow"
                >
                  {/* 🗑️ Delete button */}
                  <button
                    type="button"
                    onClick={() => {
                      const updatedImages = [...values.carousel];
                      updatedImages.splice(index, 1);
                      setFieldValue("carousel", updatedImages);
                    }}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-3xl font-bold"
                  >
                    &times;
                  </button>

                  {/* 📸 Image preview or placeholder */}
                  <div className="relative h-48 w-full border rounded-lg overflow-hidden mb-4 mt-8 bg-white">
                    <input
                      id={`carousel-file-upload-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleFileChange(event, setFieldValue, "carousel", index)
                      }
                      className="hidden"
                    />
                    <label
                      htmlFor={`carousel-file-upload-${index}`}
                      className="cursor-pointer absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg"
                    >
                      <IconCamera className="h-6 w-6 text-gray-600" />
                    </label>

                    {img ? (
                      <img
                        src={img}
                        alt={`Carousel Image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
                        No Image Selected
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Work Section */}
          {/* Work Section */}
          <div className="border p-4 rounded-lg mb-4 bg-slate-200 shadow">
            <h4 className="text-lg font-bold text-gray-700 mb-4 flex justify-between items-cente uppercaser">
              Work Section
              <ATMButton
                type="button"
                onClick={() => {
                  const newImage = { image_path: "", org_path: "" };
                  setFieldValue("workImg", [newImage, ...values.workImg]);
                }}
                color="primary"
              >
                + Add Image
              </ATMButton>
            </h4>

            {imgIsloading ? <ATMCircularProgress /> : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(values?.workImg || []).map((item: any, index: number) => (
                <div
                  key={index}
                  className="relative border rounded-lg p-4 bg-gray-50 shadow"
                >
                  {/* 🗑️ Delete button */}
                  <button
                    type="button"
                    onClick={() => {
                      const updatedImages = [...values.workImg];
                      updatedImages.splice(index, 1);
                      setFieldValue("workImg", updatedImages);
                    }}
                    className="absolute top-2  right-2 text-red-600 hover:text-red-800 text-3xl font-bold"
                  >
                    &times;
                  </button>

                  {/* 📸 Image preview or placeholder */}
                  <div className="relative h-48 w-full border rounded-lg overflow-hidden mb-4 mt-8 bg-white">
                    <input
                      id={`workImg-file-upload-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleFileChange(event, setFieldValue, "workImg", index)
                      }
                      className="hidden"
                    />
                    <label
                      htmlFor={`workImg-file-upload-${index}`}
                      className="cursor-pointer absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg"
                    >
                      <IconCamera className="h-6 w-6 text-gray-600" />
                    </label>

                    {item?.image_path ? (
                      <img
                        src={item.image_path}
                        alt={`Work Image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
                        No Image Selected
                      </div>
                    )}
                  </div>

                  {/* 📝 org_path field */}
                  <ATMTextField
                    name={`workImg[${index}].org_path`}
                    label="Original Path"
                    placeholder="Enter original path"
                    value={item?.org_path || ""}
                    onChange={(e) =>
                      setFieldValue(`workImg[${index}].org_path`, e.target.value)
                    }
                    onBlur={handleBlur}
                  />
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
