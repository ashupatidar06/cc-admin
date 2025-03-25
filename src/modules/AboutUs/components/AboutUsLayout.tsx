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

const AboutUsLayout = ({ formikProps, isLoading }: Props) => {
  const { values, setFieldValue, handleBlur, handleSubmit } = formikProps;

  const addTeamMember = () => {
    setFieldValue("team", [...values.team, { name: "", link: "", role: "", description: "" }]);
  };

  const removeTeamMember = (index: number) => {
    const updatedTeam = values.team.filter((_: any, i: number) => i !== index);
    setFieldValue("team", updatedTeam);
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
            <h3 className="text-lg font-bold">ABOUT US</h3>

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

          <ATMTextArea
            name="aboutUs"
            value={values.aboutUs}
            placeholder="Enter About Us Content"
            onChange={(e) => setFieldValue("aboutUs", e.target.value)}
            label="About Us"
            onBlur={handleBlur}
          />

          {values.team?.map((member: any, index: number) => (
            <div key={index} className="border p-4 rounded-lg mb-4 bg-white shadow">
              <h4 className="text-lg font-bold text-gray-700 mb-2 capitalize">Team Member {index + 1}</h4>

              <div className="mb-4">
                <ATMTextField
                  name={`team[${index}].name`}
                  value={member.name || ""}
                  placeholder="Enter Name"
                  onChange={(e) => setFieldValue(`team[${index}].name`, e.target.value)}
                  label="Name"
                  onBlur={handleBlur}

                />
              </div>
              <div className="mb-4">
                <ATMTextField
                  name={`team[${index}].role`}
                  value={member.role || ""}
                  placeholder="Enter Role"
                  onChange={(e) => setFieldValue(`team[${index}].role`, e.target.value)}
                  label="Role"
                  onBlur={handleBlur}

                /></div>
              <div className="mb-4">
                <ATMTextField
                  name={`team[${index}].link`}
                  value={member.link || ""}
                  placeholder="Enter Profile Link"
                  onChange={(e) => setFieldValue(`team[${index}].link`, e.target.value)}
                  label="Profile Link"
                  onBlur={handleBlur}
                />
              </div>
              <div className="mb-6">
                <ATMTextArea
                  name={`team[${index}].description`}
                  value={member.description || ""}
                  placeholder="Enter Description"
                  onChange={(e) => setFieldValue(`team[${index}].description`, e.target.value)}
                  label="Description"
                  onBlur={handleBlur}
                /></div>
              <ATMButton

                onClick={() => removeTeamMember(index)}
                color="error"
                size="small"
                extraClasses="w-1/4 mt-4"
              >
                Remove
              </ATMButton>
            </div>
          ))}

          <ATMButton
            extraClasses="w-1/4 ml-4"

            onClick={addTeamMember} color="primary">
            Add Team Member
          </ATMButton>
        </div>
      )}
    </>
  );
};

export default AboutUsLayout;
