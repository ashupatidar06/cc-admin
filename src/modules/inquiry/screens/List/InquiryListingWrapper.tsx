import { useDispatch } from "react-redux";
import { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { useFetchData } from "src/hooks/useFetchData";
import { useFilterPagination } from "src/hooks/useFilterPagination";
import { AppDispatch } from "src/store";
import { InquiryProps } from "../../models/Inquiry.model";
import { useGetInquiryQuery, useUpdateInquiryByIdMutation } from "../../service/inquiryServices";
import { setIsOpenAddDialog } from "../../slice/CategorySlice";
import InquiryListing from "./InquiryListing";
import { useNavigate } from "react-router-dom";
import { IconExclamationCircle, IconSquareRoundedCheck } from "@tabler/icons-react";
import { useState } from "react";
import ATMConfirmationDialog from "src/components/atoms/ATMConfirmationDialog/ATMConfirmationDialog";

type Props = {};

const InquiryListingWrapper = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const [updateInquiry] = useUpdateInquiryByIdMutation();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [acknowledged, setAcknowleded] = useState("")

  // api
  const { searchQuery, limit, page, appliedFilters } = useFilterPagination();
  const { data, isLoading, totalData, totalPages } = useFetchData(
    useGetInquiryQuery,
    {
      body: {
        limit,
        page,
        searchValue: searchQuery,
        searchIn: JSON.stringify(["name", "industry", "businessName", "whatBringYou", "marketingBudget"]),
        isPaginationRequired: true,
        ...(acknowledged !== "" && {
          filterBy: JSON.stringify([{ fieldName: "acknowledged", value: acknowledged }]),
        }),
      },
    }
  );

  const handleConfirm = (closeDialog: () => void, setIsLoading: (loading: boolean) => void) => {
    if (!selectedRowId) return;
    setIsLoading(true);
    updateInquiry({ id: selectedRowId })
      .then(() => {
        setIsLoading(false);
        closeDialog();
      })
      .catch(() => setIsLoading(false));
  };

  const tableHeaders: TableHeader<InquiryProps>[] = [
    {
      fieldName: "name",
      headerName: "Name",
      flex: "flex-[1_1_0%]",
    },
    {
      fieldName: "email",
      headerName: "Email",
      flex: "flex-[1_1_0%]",
    },
    {
      fieldName: "phone",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
    },
    {
      fieldName: "businessName",
      headerName: "Business Name",
      flex: "flex-[1_1_0%]",
    },
    {
      fieldName: "industry",
      headerName: "Industry",
      flex: "flex-[1_1_0%]",
    },
    {
      fieldName: "acknowledged",
      headerName: "Acknowledged",
      flex: "flex-[1_1_0%]",
      renderCell: (row) => (
        row?.acknowledged ? (
          <IconSquareRoundedCheck className="text-green-500 cursor-pointer" />
        ) : (
          <IconExclamationCircle
            onClick={() => {
              setSelectedRowId(row?._id);
              setShowConfirmDialog(true);
            }}
            className="text-red-500 cursor-pointer"
          />
        )
      ),
    },
  ];

  return (
    <>
      <InquiryListing
        tableHeaders={tableHeaders}
        rowData={data as InquiryProps[]}
        onAddNew={() => dispatch(setIsOpenAddDialog(true))}
        onView={(item) => {
          navigation(`/inquiry/${item?._id}`);
        }}
        filterPaginationData={{
          totalCount: totalData,
          totalPages: totalPages,
        }}
        isLoading={isLoading}
        {...{ acknowledged, setAcknowleded }}
      />

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <ATMConfirmationDialog
          type="INFO"
          title="Confirm Action"
          message="Are you sure you want to acknowledge this inquiry?"
          confirmationText="Yes, Acknowledge"
          declineText="Cancel"
          onConfirm={handleConfirm}
          onDecline={() => setShowConfirmDialog(false)}
          closeDialog={() => setShowConfirmDialog(false)}
        />
      )}
    </>
  );
};

export default InquiryListingWrapper;