import { FormikProps } from "formik";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";

type Props = {
  formikProps: FormikProps<any>;
  onClose: () => void;
  type: "ADD" | "EDIT";
  isLoading?: boolean;
};

const CultureOfMarketingLayout = ({
  formikProps,
  onClose,
  type,
  isLoading,
}: Props) => {
  const { values, setFieldValue, handleBlur } = formikProps;

  const defaultItem = {
    title: "",
    subTitle: "",
    link: "",
    description: "",
    image_path: "",
  };

  const handleAdd = (key: string) => {
    if (Array.isArray(values[key])) {
      setFieldValue(key, [...values[key], { ...defaultItem }]);
    }
  };

  const handleRemove = (key: string, index: number) => {
    const updatedArray = [...values[key]];
    updatedArray.splice(index, 1);
    setFieldValue(key, updatedArray);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[185px]">
          <ATMCircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-y-6 p-6 bg-white shadow-lg rounded-lg">
          {Object.keys(values).map((key) => {
            const value = values[key];

            if (Array.isArray(value)) {
              return (
                <div
                  key={key}
                  className="border p-6 rounded-lg shadow-md bg-gray-100"
                >
                  <h3 className="text-xl font-bold uppercase  mb-4 text-gray-700">
                    {/* {key.toUpperCase()} */}
                    Culture Of Marketing
                  </h3>

                  {value.map((item, index) => (
                    <div
                      key={`${key}-${index}`}
                      className="border p-8  rounded-lg relative mb-4 bg-white shadow"
                    >
                      <h4 className="text-md font-semibold mb-4 text-gray-600">
                        Section {index + 1}
                      </h4>

                      {Object.keys(defaultItem).map((subKey) => {
                        if (subKey === "description") {
                          return (
                            <textarea
                              key={`${key}-${index}-${subKey}`}
                              name={`${key}[${index}].${subKey}`}
                              value={item[subKey] || ""}
                              placeholder={`Enter ${subKey}`}
                              onChange={(e) =>
                                setFieldValue(
                                  `${key}[${index}].${subKey}`,
                                  e.target.value
                                )
                              }
                              className="w-full p-5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                              rows={4}
                              onBlur={handleBlur}
                            />
                          );
                        }

                        return (
                          <div className="my-5">
                            <ATMTextField
                              className="p-4"
                              key={`${key}-${index}-${subKey}`}
                              name={`${key}[${index}].${subKey}`}
                              value={item[subKey] || ""}
                              placeholder={`Enter ${subKey}`}
                              onChange={(e) =>
                                setFieldValue(
                                  `${key}[${index}].${subKey}`,
                                  e.target.value
                                )
                              }
                              label={subKey.replace(/_/g, " ").toUpperCase()}
                              onBlur={handleBlur}
                            />
                          </div>
                        );
                      })}

                      <button
                        onClick={() => handleRemove(key, index)}
                        className="absolute top-3 right-3 text-red-500 border border-red-500 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => handleAdd(key)}
                    className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
                  >
                    + Add More
                  </button>
                </div>
              );
            }

            return (
              <ATMTextField
                key={key}
                name={key}
                value={value}
                onChange={(e) => setFieldValue(key, e.target.value)}
                label={key.replace(/_/g, " ").toUpperCase()}
                placeholder={`Enter ${key}`}
                onBlur={handleBlur}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default CultureOfMarketingLayout;
