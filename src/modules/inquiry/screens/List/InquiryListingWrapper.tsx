import { useDispatch } from "react-redux";
import { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { useFetchData } from "src/hooks/useFetchData";
import { useFilterPagination } from "src/hooks/useFilterPagination";
import { AppDispatch } from "src/store";
import { InquiryProps } from "../../models/Inquiry.model";
import { useGetInquiryQuery } from "../../service/inquiryServices";
import { setIsOpenAddDialog } from "../../slice/CategorySlice";
import InquiryListing from "./InquiryListing";
import { useNavigate } from "react-router-dom";

type Props = {};

const InquiryListingWrapper = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation= useNavigate()

  // api
  const { searchQuery, limit, page } = useFilterPagination();
  const { data, isLoading, totalData, totalPages } = useFetchData(
    useGetInquiryQuery,
    {
      body: {
        limit,
        page,
        searchValue: searchQuery,
        searchIn: JSON.stringify(["categoryName"]),
        isPaginationRequired: true,
      },
    }
  );

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
      headerName: "industry",
      flex: "flex-[1_1_0%]",
    },
  ];

  return (
    <>
      <InquiryListing
        tableHeaders={tableHeaders}
        rowData={data as InquiryProps[]}
        
        onAddNew={() => dispatch(setIsOpenAddDialog(true))}
        onView={(item)=>{
          navigation(`/inquiry/${item?._id}`)
        }}

        filterPaginationData={{
          totalCount: totalData,
          totalPages: totalPages,
        }}
        isLoading={isLoading}
      />
    </>
  );
};

export default InquiryListingWrapper;
