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
    const newSection = {
      title: "",
      image: "",
      head: "",
      date: "",
      para1: "",
      para2: "",
      blockquote: "",
      para3: "",
      bullets: [""],
      para4: "",
    };
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
              Save
            </ATMButton>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {values.data.map((block, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg bg-white shadow-lg relative"
              >
                <h4 className="text-lg font-bold mb-4 text-gray-700">
                  Section {index + 1}
                </h4>
                <div className="mb-4">
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
                </div>

                <div className="mb-4">

                  <ATMTextField
                    name={`data[${index}].head`}
                    value={block.head}
                    onChange={(e) =>
                      setFieldValue(`data[${index}].head`, e.target.value)
                    }
                    label="Head"
                    placeholder="Enter Headline"
                    onBlur={handleBlur}
                  />
                </div>

                <div className="mb-4">

                  <ATMTextField
                    name={`data[${index}].date`}
                    disabled={true}
                    value={block.date}
                    onChange={(e) =>
                      setFieldValue(`data[${index}].date`, e.target.value)
                    }
                    label="Date"
                    placeholder="Enter Date"
                    onBlur={handleBlur}
                  />
                </div>

                <div className="mb-4">


                  <ATMTextArea
                    name={`data[${index}].para1`}
                    value={block.para1}
                    onChange={(e) =>
                      setFieldValue(`data[${index}].para1`, e.target.value)
                    }
                    label="Paragraph 1"
                    placeholder="Enter Paragraph 1"
                    onBlur={handleBlur}
                  />
                </div>

                <div className="mb-4">

                  <ATMTextArea
                    name={`data[${index}].para2`}
                    value={block.para2}
                    onChange={(e) =>
                      setFieldValue(`data[${index}].para2`, e.target.value)
                    }
                    label="Paragraph 2"
                    placeholder="Enter Paragraph 2"
                    onBlur={handleBlur}
                  />
                </div>

                <div className="mb-4">

                  <ATMTextArea
                    name={`data[${index}].blockquote`}
                    value={block.blockquote}
                    onChange={(e) =>
                      setFieldValue(`data[${index}].blockquote`, e.target.value)
                    }
                    label="Blockquote"
                    placeholder="Enter Blockquote"
                    onBlur={handleBlur}
                  />
                </div>

                <div className="mb-4">


                  <ATMTextArea
                    name={`data[${index}].para3`}
                    value={block.para3}
                    onChange={(e) =>
                      setFieldValue(`data[${index}].para3`, e.target.value)
                    }
                    label="Paragraph 3"
                    placeholder="Enter Paragraph 3"
                    onBlur={handleBlur}
                  />
                </div>

                <label className="text-sm font-medium text-gray-600 mt-4 block">
                  Bullets
                </label>
                {block.bullets.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex gap-2 items-center mb-2">
                    <div className="flex-1 mb-4">
                      <ATMTextField
                        label=""
                        name={`data[${index}].bullets[${bulletIndex}]`}
                        value={bullet}
                        onChange={(e) =>
                          setFieldValue(
                            `data[${index}].bullets[${bulletIndex}]`,
                            e.target.value
                          )
                        }
                        placeholder={`Bullet ${bulletIndex + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const updatedBullets = [...block.bullets];
                        updatedBullets.splice(bulletIndex, 1);
                        setFieldValue(`data[${index}].bullets`, updatedBullets);
                      }}
                      className="text-red-500 mr-8 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <ATMButton
                  type="button"
                  color="primary"
                  onClick={() =>
                    setFieldValue(`data[${index}].bullets`, [
                      ...block.bullets,
                      "",
                    ])
                  }
                  extraClasses="w-1/3"
                >
                  + Add Bullet
                </ATMButton>

                <ATMTextArea
                  name={`data[${index}].para4`}
                  value={block.para4}
                  onChange={(e) =>
                    setFieldValue(`data[${index}].para4`, e.target.value)
                  }
                  label="Paragraph 4"
                  placeholder="Enter Paragraph 4"
                  onBlur={handleBlur}
                />

                <label className="uppercase text-sm font-bold py-2 px-2 mt-4 block">
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
                  <div className="h-52 w-52 p-1 flex items-center justify-center border mt-2">
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

          <ATMButton type="button" color="primary" onClick={handleAddSection} extraClasses="w-1/3">
            + Add New Section
          </ATMButton>
        </div>
      )}
    </>
  );
};

export default CultureOfOriginLayout;
