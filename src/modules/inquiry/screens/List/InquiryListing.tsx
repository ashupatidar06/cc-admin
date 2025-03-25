import { IconPlus } from "@tabler/icons-react";
import ATMPageHeader from "src/components/atoms/ATMPageHeader/ATMPageHeader";
import ATMPagination from "src/components/atoms/ATMPagination/ATMPagination";
import MOLFilterBar from "src/components/molecules/MOLFilterBar/MOLFilterBar";
import MOLTable, { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { InquiryProps } from "../../models/Inquiry.model";
import ATMSelect from "src/components/atoms/FormElements/ATMSelect/ATMSelect";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup"; // ✅ Added missing import
import { ATMButton } from "src/components/atoms/ATMButton/ATMButton";
import { useFilterPagination } from "src/hooks/useFilterPagination";

type Props = {
  onAddNew: () => void;
  rowData: InquiryProps[];
  tableHeaders: TableHeader<InquiryProps>[];
  isLoading: boolean;
  filterPaginationData: {
    totalCount: number;
    totalPages: number;
  };
  onEdit?: (item: InquiryProps) => void;
  onView?: (item: InquiryProps) => void;
  onDelete?: (item: any, closeDialog: () => void) => void;
  acknowledged: any,
  setAcknowleded: any
};

const InquiryListing = ({
  onAddNew,
  tableHeaders,
  rowData,
  isLoading,
  filterPaginationData: { totalCount, totalPages },
  onEdit,
  onView,
  onDelete,
  acknowledged,
  setAcknowleded

}: Props) => {
  const filterValues = [
    { label: "All", value: "" },
    { label: "Acknowledged", value: true },
    { label: "Not Acknowledged", value: false },
  ];

  return (
    <div className="flex flex-col h-full gap-2">
      {/* Page Header */}
      <ATMPageHeader
        heading="INQUIRY"
        hideButton
        buttonProps={{
          label: "Add New",
          icon: IconPlus,
          onClick: onAddNew,
        }}
      />

      <div className="flex flex-col overflow-auto border rounded border-slate-300 h-screen">
        {/* Table Toolbar */}
        <div className="flex items-center gap-28 p-4">
          <MOLFilterBar />
          {/* Dropdown (ATMSelect) */}
          <Formik
            initialValues={{ Acknowledge: { label: 'All', value: "" } }}
            // validationSchema={Yup.object({
            //   Acknowledge: Yup.string().required("Acknowledgment is required"),
            // })}
            onSubmit={(values) => {



              setAcknowleded(values?.Acknowledge?.value as any)
            }}
          >
            {({ values, errors, touched, setFieldValue, handleSubmit }) => (
              <Form className="flex items-center gap-4" >
                <div className="w-64">
                  <ATMSelect
                    name="Acknowledge"
                    value={values.Acknowledge}
                    onChange={(newValue) => setFieldValue("Acknowledge", newValue)}
                    label=""
                    options={filterValues}
                    variant="outlined"
                    valueAccessKey="value"
                  />
                </div>
                <ATMButton onClick={() => handleSubmit()}>
                  Submit
                </ATMButton>
              </Form>
            )}
          </Formik>

          {/* MOLFilterBar - Now aligned side by side with the dropdown */}

        </div>


        {/* Table */}
        <div className="flex-1 overflow-auto">
          <MOLTable<InquiryProps>
            tableHeaders={tableHeaders}
            data={rowData}
            getKey={(item) => item?._id}
            onEdit={onEdit}
            onView={onView}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        </div>

        {/* Pagination */}
        <ATMPagination totalPages={totalPages} rowCount={totalCount} rows={rowData} />
      </div>
    </div>
  );
};

export default InquiryListing;
