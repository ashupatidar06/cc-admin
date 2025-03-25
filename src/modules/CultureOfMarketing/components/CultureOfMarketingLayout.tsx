import { FormikProps } from "formik";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";
import ATMTextArea from "src/components/atoms/FormElements/ATMTextArea/ATMTextArea";
import { ATMButton } from "src/components/atoms/ATMButton/ATMButton";

type Props = {
  formikProps: FormikProps<any>;
  onClose: () => void;
  type: "ADD" | "EDIT";
  isLoading?: boolean;
};

const CultureOfMarketingLayout = ({ formikProps, isLoading }: Props) => {
  const { values, setFieldValue, handleBlur, handleSubmit } = formikProps;

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[185px]">
          <ATMCircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-y-6 p-6 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between border-b-2 pb-4 border-black">
            <h3 className="text-lg font-bold">CULTURE OF MARKETING</h3>

            <ATMButton
              extraClasses="-mt-1 mr-4"

              autoFocus onClick={handleSubmit} color="primary">
              Add
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
              <div key={section} className="border p-4 rounded-lg mb-4 bg-white shadow">
                <h4 className="text-lg font-bold text-gray-700 mb-2 capitalize">
                  {section.replace(/([A-Z])/g, ' $1').trim()}
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
                  /> </div>
                {section != "middleBanner" ?
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
                    />  </div> : null}

                <div className="mb-4">

                  <ATMTextField
                    name={`${section}.img`}
                    value={values[section]?.img || ""}
                    placeholder="Enter Image URL"
                    onChange={(e) =>
                      setFieldValue(`${section}.img`, e.target.value)
                    }
                    label="Image URL"
                    onBlur={handleBlur}
                  /> </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default CultureOfMarketingLayout;