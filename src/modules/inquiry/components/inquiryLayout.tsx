import { FormikProps } from "formik";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import MOLFormDialog from "src/components/molecules/MOLFormDialog/MOLFormDialog";
import { CategoryFormValues } from "../models/Inquiry.model";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";

type Props = {
  formikProps: FormikProps<CategoryFormValues>;
  onClose: () => void;
  type: "ADD" | "EDIT";
  isLoading?: boolean;
};

const CategoryFormLayout = ({ formikProps, onClose , type, isLoading }: Props) => {
  const { 
  values, 
  setFieldValue, 
  isSubmitting, 
  handleBlur, 
  // touched,
  // errors 
   } =
    formikProps;

  return (
      <MOLFormDialog
        title={type === "ADD" ? "Add" : "Update Category"}
        onClose={onClose}
        isSubmitting={isSubmitting}
      >
      {isLoading ? (
        <div className="flex justify-center items-center  h-[185px]">
          <ATMCircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {/* Name */}
          <div className="">
            <ATMTextField
              name="categoryName"
              value={values.categoryName}
              onChange={(e) => setFieldValue("categoryName", e.target.value)}
              label="Category Name"
              placeholder="Enter category name"
              onBlur={handleBlur}
              // isTouched={touched?.name}
              // errorMessage={errors?.name}
              // isValid={!errors?.name}
            />
           
          </div>
        </div>
        )}
      </MOLFormDialog>
  );
};

export default CategoryFormLayout;
