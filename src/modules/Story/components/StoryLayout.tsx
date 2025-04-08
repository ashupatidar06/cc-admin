import { FormikProps } from "formik";
import { ATMButton } from "src/components/atoms/ATMButton/ATMButton";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";
import ATMTextArea from "src/components/atoms/FormElements/ATMTextArea/ATMTextArea";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import { useUploadFileMutation } from "src/services/AuthServices";
import { StoryFormValues } from "../models/Story.model";

type Props = {
  formikProps: FormikProps<StoryFormValues>;
  onClose: () => void;
  type: "ADD" | "EDIT";
  isLoading?: boolean;
};

const CultureOfOriginLayout = ({
  formikProps,
  onClose,
  type,
  isLoading,
}: Props) => {
  const { values, setFieldValue, isSubmitting, handleBlur, handleSubmit } =
    formikProps;

  const [uploadFile, { isLoading: imgIsloading }] = useUploadFileMutation();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
    fieldName: string
  ) => {
    const file = event.currentTarget.files?.[0] || null;
    if (!file) return;

    const sanitizedFileName = file.name.replace(/\s+/g, "_");
    const newFile = new File([file], sanitizedFileName, { type: file.type });

    const formData = new FormData();
    formData.append("file", newFile);
    formData.append("folder", "story");

    try {
      const response = await uploadFile({
        body: formData,
        fileName: fieldName,
      }).unwrap();

      if (response?.fileUrl) {
        setFieldValue(fieldName, response.fileUrl);
      }
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
    }
  };

  const handleAddSection = () => {
    const newSection = { title: "", image: "", body: "" };
    setFieldValue("data", [...values.data, newSection]);
  };

  const handleRemoveSection = (index: number) => {
    const updated = [...values.data];
    updated.splice(index, 1);
    setFieldValue("data", updated);
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
            <h3 className="text-lg font-bold">STORY SECTION</h3>
            <ATMButton
              extraClasses="-mt-1 mr-4"
              autoFocus
              onClick={handleSubmit}
              color="primary"
            >
              {type === "ADD" ? "Add" : "Update"}
            </ATMButton>
          </div>
          <div className="grid grid-cols-2 gap-1 ">

            {values.data.map((block: any, index: any) => (
              <div
                key={index}
                className="border p-4 m-4 rounded-lg mb-4 bg-white shadow-lg relative"
              >
                <h4 className="text-lg font-bold mb-4 text-gray-700">
                  Section {index + 1}
                </h4>

                <ATMTextField
                  name={`data[${index}].title`}
                  value={block.title}
                  onChange={(e) =>
                    setFieldValue(`data[${index}].title`, e.target.value)
                  }
                  label="Title"
                  placeholder="Enter Title"
                  onBlur={handleBlur}
                />

                <ATMTextArea
                  name={`data[${index}].body`}
                  value={block.body}
                  onChange={(e) =>
                    setFieldValue(`data[${index}].body`, e.target.value)
                  }
                  label="Body"
                  placeholder="Enter Body"
                  onBlur={handleBlur}
                  className="mb-8"
                />

                <label className="uppercase text-sm font-bold py-8 px-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    handleFileChange(event, setFieldValue, `data[${index}].image`)
                  }
                  className="border p-2 rounded w-full"
                />

                {block.image && (
                  <div className="h-96 w-full p-1 flex items-center justify-center border mt-2">
                    <img
                      src={block.image}
                      alt="uploaded"
                      className="h-full w-full object-fill"
                    />
                  </div>
                )}

                <button
                  type="button"
                  className="absolute top-3 right-3 text-red-600 font-bold"
                  onClick={() => handleRemoveSection(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <ATMButton type="button" color="primary" onClick={handleAddSection}>
            + Add New Section
          </ATMButton>
        </div>
      )}
    </>
  );
};

export default CultureOfOriginLayout;
