import { IconPlus } from "@tabler/icons-react";
import ATMPageHeader from "src/components/atoms/ATMPageHeader/ATMPageHeader";
import ATMPagination from "src/components/atoms/ATMPagination/ATMPagination";
import MOLFilterBar from "src/components/molecules/MOLFilterBar/MOLFilterBar";
import MOLTable, {
  TableHeader,
} from "src/components/molecules/MOLTable/MOLTable";
import { InquiryProps } from "../../models/Inquiry.model";

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
}: Props) => {
  return (
    <>
      <div className="flex flex-col h-full gap-2">
        <ATMPageHeader
          heading="Inquiry"
          hideButton
          buttonProps={{
            label: "Add New",
            icon: IconPlus,
            onClick: onAddNew,
          }}
        />
        <div className="flex flex-col overflow-auto border rounded border-slate-300 h-screen">
          {/* Table Toolbar */}
          <MOLFilterBar />

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
          <ATMPagination
            totalPages={totalPages}
            rowCount={totalCount}
            rows={rowData}
          />
        </div>
      </div>
    </>
  );
};

export default InquiryListing;
