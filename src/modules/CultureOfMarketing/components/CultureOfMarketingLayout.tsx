import { FormikProps } from "formik";
import React from "react";
import { ATMButton } from "src/components/atoms/ATMButton/ATMButton";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";
import ATMTextArea from "src/components/atoms/FormElements/ATMTextArea/ATMTextArea";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import { useUploadFileMutation } from "src/services/AuthServices";

type Props = {
  formikProps: FormikProps<any>;
  onClose: () => void;
  type: "ADD" | "EDIT";
  isLoading?: boolean;
};

const CultureOfMarketingLayout = ({ formikProps, isLoading }: Props) => {
  const { values, setFieldValue, handleBlur, handleSubmit } = formikProps;

  const [uploadFile, { isLoading: imgIsloading }] = useUploadFileMutation();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
    fieldName: any
  ) => {
    const file = event.currentTarget.files?.[0] || null;
    if (!file) return;

    // Remove spaces from the file name
    const sanitizedFileName = file.name.replace(/\s+/g, "_"); // Replace spaces with underscores

    // Create a new file with the sanitized name
    const newFile = new File([file], sanitizedFileName, { type: file.type });

    console.log("Uploading file:", fieldName, newFile);
    setFieldValue(fieldName, newFile);

    // Upload file
    const formData = new FormData();
    formData.append("file", newFile);
    formData.append("folder", "cultureOfmarket");

    try {
      const response = await uploadFile({
        body: formData,
        fileName: fieldName,
      }).unwrap();
      if (response?.fileUrl) {
        setFieldValue(fieldName, response.fileUrl);

        console.log(`${fieldName} uploaded successfully:`, response.fileUrl);
      }
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[185px]">
          <ATMCircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-y-6 p-6 bg-slate-100 shadow-lg rounded-lg">
          <div className="flex justify-between border-b-2 pb-4 border-black">
            <h3 className="text-lg font-bold">CULTURE OF MARKETING</h3>

            <ATMButton
              extraClasses="-mt-1 mr-4"
              autoFocus
              onClick={handleSubmit}
              color="primary"
              disabled={imgIsloading}
            >
              Save
            </ATMButton>
          </div>
          {/* <ATMTextField
            name="title"
            value={values.title}
            placeholder="Enter Title"
            onChange={(e) => setFieldValue("title", e.target.value)}
            label="Title"
            onBlur={handleBlur}
          /> */}

          <ATMTextArea
            name="body"
            value={values.body}
            placeholder="Enter Body"
            onChange={(e) => setFieldValue("body", e.target.value)}
            label="Body"
            onBlur={handleBlur}
          />

          {["theChallenge", "middleBanner", "theResearch", "theSolution"].map(
            (section) => (
              <div
                key={section}
                className="border p-4 rounded-lg mb-4 bg-white shadow"
              >
                <h4 className="text-lg font-bold text-gray-700 mb-2 capitalize">
                  {section.replace(/([A-Z])/g, " $1").trim()}
                </h4>

                <div className="mb-4">
                  <ATMTextField
                    name={`${section}.title`}
                    value={values[section]?.title || ""}
                    placeholder="Enter Title"
                    onChange={(e) =>
                      setFieldValue(`${section}.title`, e.target.value)
                    }
                    label="Title"
                    onBlur={handleBlur}
                  />{" "}
                </div>
                {section != "middleBanner" ? (
                  <div className="mb-4">
                    <ATMTextArea
                      name={`${section}.body`}
                      value={values[section]?.body || ""}
                      placeholder="Enter Body"
                      onChange={(e) =>
                        setFieldValue(`${section}.body`, e.target.value)
                      }
                      label="Body"
                      onBlur={handleBlur}
                    />{" "}
                  </div>
                ) : null}

                <div className="mb-4">

                  <label className=" uppercase text-sm font-bold py-2 px-2">
                    {"upload image"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleFileChange(event, setFieldValue, `${section}.img`)
                    }
                    className="border p-2 rounded"
                  />

                  <div className="h-96 w-full p-1 flex items-center justify-center border">
                    <img
                      src={values[section]?.img}
                      alt=""
                      className="h-full w-full object-fill"
                    />
                  </div>
                </div>
                {/* </div> */}
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default CultureOfMarketingLayout;
