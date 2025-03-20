
import React from "react";
import UserListing from "./UserListing";
import { User } from "../../models/User.model";
import { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { setIsOpenAddDialog, setIsOpenEditDialog } from "../../slice/UserSlice";
import AddUserFormWrapper from "../Add/AddUserFormWrapper";
import { useFetchData } from "src/hooks/useFetchData";
import { useFilterPagination } from "src/hooks/useFilterPagination";
import { useGetUserQuery } from "../../service/UserServices";
// import { showToast } from "src/utils/showToaster";

type Props = {};

const UserListingWrapper = (props: Props) => {
  // const [id, setId] = useState<string>("");
  const { isOpenAddDialog,
    // isOpenEditDialog 
  } = useSelector((state: RootState) => state?.user);

  const dispatch = useDispatch<AppDispatch>();

  // const [deleteApi] = useDeleteMutation();

  // api
  const { searchQuery, limit, page } = useFilterPagination();
  const { data, isLoading, totalData, totalPages } = useFetchData(
    useGetUserQuery,
    {
      body: {
        limit,
        page,
        searchValue: searchQuery,
        searchIn: JSON.stringify(["fullName", "email", "mobileNumber"]),
        isPaginationRequired: true,
      },
    }
  );

  //   const handleDelete = (item: User, closeDialog: () => void) => {
  //   deleteApi(item?._id).then((res: any) => {
  //     if (res?.error) {
  //       showToast("error", res?.error?.data?.message);
  //     } else {
  //       if (res?.data?.status) {
  //         showToast("success", res?.data?.message);
  //         closeDialog();
  //       } else {
  //         showToast("error", res?.data?.message);
  //       }
  //     }
  //   });
  // };

  const tableHeaders: TableHeader<User>[] = [
    // {
    //   fieldName: "fullName",
    //   headerName: "FullName",
    //   flex: "flex-[1_1_0%]"
    // },
    {
      fieldName: "email",
      headerName: "Email",
      flex: "flex-[1_1_0%]"
    },
    // {
    //   fieldName: "userName",
    //   headerName: "UserName",
    //   flex: "flex-[1_1_0%]"
    // },
    // {
    //   fieldName: "phone",
    //   headerName: "Phone",
    //   flex: "flex-[1_1_0%]"
    // },
    {
      fieldName: "userType",
      headerName: "User Type",
      flex: "flex-[1_1_0%]"
    },
  ];

  return (
    <>
      <UserListing
        tableHeaders={tableHeaders}
        rowData={data as User[]}
        onAddNew={() => dispatch(setIsOpenAddDialog(true))}
        filterPaginationData={{
          totalCount: totalData,
          totalPages: totalPages,
        }}
        isLoading={isLoading}
        // onDelete={handleDelete}
        // onEdit={(value) => {
        //   dispatch(setIsOpenEditDialog(true));
        //   // setId(value?._id);
        // }}
      />

      {/* {isOpenAddDialog && (
        <AddUserFormWrapper
          onClose={() => dispatch(setIsOpenAddDialog(false))}
        />
      )} */}


      {/* {isOpenEditDialog && (
        <EditAdminUserFormWrapper
          id={id}
          onClose={() => {
            dispatch(setIsOpenEditDialog(false));
          }}
        />
      )}
    */}
    </>
  );
};

export default UserListingWrapper;

