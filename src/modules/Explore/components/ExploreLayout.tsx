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

// Imports remain unchanged

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
        <div className="flex flex-col gap-y-6 p-6 bg-slate-100 shadow-lg rounded-lg">
          <div className="flex justify-between border-b-2 pb-4 border-black">
            <h3 className="text-lg font-bold">EXPLORE SECTION</h3>
            <ATMButton
              extraClasses="-mt-1 mr-4"
              autoFocus
              onClick={handleSubmit}
              color="primary"
            >
              Save
            </ATMButton>
          </div>

          {/* Collabs Section */}
          <div className="mb-12">
            <h4 className="text-base font-bold text-gray-700 mb-4">Collabs</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.collabs.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition"
                >
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-600 font-bold text-xl"
                    onClick={() => handleRemoveItem("collabs", index)}
                  >
                    ✕
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "collabs", index)}
                    className="mb-4"
                  />

                  {item ? (
                    <img
                      src={item}
                      alt={`Collab ${index + 1}`}
                      className="w-full h-48 object-cover rounded-md border"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 border rounded-md">
                      No image selected
                    </div>
                  )}
                </div>
              ))}
            </div>

            <ATMButton
              type="button"
              onClick={() => handleAddItem("collabs")}
              extraClasses="mt-4"
            >
              + Add Collab
            </ATMButton>
          </div>

          <div className="h-1 bg-gray-700 w-full my-4" />

          {/* Approach Section */}
          <div>
            <h4 className="text-base font-bold text-gray-700 mb-4">Approach</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.approach.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition"
                >
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-600 font-bold text-xl"
                    onClick={() => handleRemoveItem("approach", index)}
                  >
                    ✕
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "approach", index)}
                    className="mb-4"
                  />

                  {item ? (
                    <img
                      src={item}
                      alt={`Approach ${index + 1}`}
                      className="w-full h-48 object-cover rounded-md border"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 border rounded-md">
                      No image selected
                    </div>
                  )}
                </div>
              ))}
            </div>

            <ATMButton
              type="button"
              onClick={() => values.approach.length < 32 && handleAddItem("approach")}
              extraClasses="mt-4"
              disabled={values.approach.length >= 32}
            >
              + Add Approach
            </ATMButton>
          </div>
        </div>
      )}
    </>
  );
};

export default CultureOfOriginLayout;
