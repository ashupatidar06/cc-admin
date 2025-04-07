import { FormikProps } from "formik";
import { ATMButton } from "src/components/atoms/ATMButton/ATMButton";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";
import { ExploreFormValues } from "../models/Explore.model";
import { useUploadFileMutation } from "src/services/AuthServices";

type Props = {
  formikProps: FormikProps<ExploreFormValues>;
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

  const handleAddItem = (field: "collabs" | "approach") => {
    const updated = [...values[field], ""];
    setFieldValue(field, updated);
  };

  const handleRemoveItem = (field: "collabs" | "approach", index: number) => {
    const updated = [...values[field]];
    updated.splice(index, 1);
    setFieldValue(field, updated);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "collabs" | "approach",
    index: number
  ) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    const sanitizedFileName = file.name.replace(/\s+/g, "_");
    const newFile = new File([file], sanitizedFileName, { type: file.type });

    const formData = new FormData();
    formData.append("file", newFile);
    formData.append("folder", "cultureOfOrigin");

    try {
      const response = await uploadFile({
        body: formData,
        fileName: `${field}-${index}`,
      }).unwrap();

      if (response?.fileUrl) {
        const updated = [...values[field]];
        updated[index] = response.fileUrl;
        setFieldValue(field, updated);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[185px]">
          <ATMCircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-y-6 p-6 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between border-b-2 pb-4 border-black">
            <h3 className="text-lg font-bold">EXPLORE SECTION</h3>
            <ATMButton
              extraClasses="-mt-1 mr-4"
              autoFocus
              onClick={handleSubmit}
              color="primary"
            >
              {type === "ADD" ? "Add" : "Update"}
            </ATMButton>
          </div>

          {/* Collabs Section */}
          <div className="mb-12">
            <h4 className="text-base font-bold text-gray-700 mb-2">Collabs</h4>
            <div className="grid grid-cols-3 gap-1 ">
              {values.collabs.map((item, index) => (
                <div key={index} className="relative mb-6">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "collabs", index)}
                    className="mb-2"
                  />

                  {item && (
                    <div className="mt-2 border rounded p-2">
                      <img
                        src={item}
                        alt={`Collab ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    className="absolute top-0 right-3 text-red-600 font-bold"
                    onClick={() => handleRemoveItem("collabs", index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <ATMButton type="button" onClick={() => handleAddItem("collabs")}>
              + Add Collab
            </ATMButton>
          </div>

          <div className="h-1 bg-gray-700 w-full my-4" />

          {/* Approach Section */}
          <div>
            <h4 className="text-base font-bold text-gray-700 mb-2 mt-12">
              Approach
            </h4>
            <div className="grid grid-cols-3 gap-1 ">

              {values.approach.map((item, index) => (
                <div key={index} className="relative mb-6">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "approach", index)}
                    className="mb-2"
                  />

                  {item && (
                    <div className="mt-2 border rounded p-2">
                      <img
                        src={item}
                        alt={`Approach ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    className="absolute top-0 right-3 text-red-600 font-bold"
                    onClick={() => handleRemoveItem("approach", index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <ATMButton type="button" onClick={() => handleAddItem("approach")}>
              + Add Approach
            </ATMButton>
          </div>
        </div>
      )}
    </>
  );
};

export default CultureOfOriginLayout;
