import React from "react";
import { useFetchData } from "src/hooks/useFetchData";
import { useGetInquiryByIdQuery } from "../../service/inquiryServices";
import { useParams } from "react-router-dom";

type InquiryProps = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  businessName: string;
  industry: string;
  whatBringYou: string;
  focusArea: string[];
  marketingBudget: string[];
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const InquiryCard: React.FC = () => {
  const param = useParams();
  const {
    data: inquiryData,
    isLoading,
    isFetching,
  } = useGetInquiryByIdQuery({ id: param?.id }, { skip: !param?.id });

  if (isLoading || isFetching) {
    return <p className="text-center text-gray-500">Loading inquiries...</p>;
  }

  const inquiry = inquiryData?.data;

  if (!inquiry || inquiry.length === 0) {
    return <p className="text-center text-gray-500">No inquiries found.</p>;
  }
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 w-full max-w-full h-full mx-auto">
      <h2 className="text-xl font-bold text-gray-800 py-3">
        Inquiry Details : -
      </h2>
      <div className="flex justify-between items-center mb-4 shadow-md border-l-8 border-slate-400 border-t-2 p-3 rounded-2xl">
        <p className="text-ms  text-gray-800">
          <strong>Name:</strong> {inquiry.name || 'N/A'}
        </p>
        {/* <span
          className={`text-xs px-3 py-1 rounded-full ${
            inquiry.isActive
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {inquiry.isActive ? "Active" : "Inactive"}
        </span> */}
      </div>

      <p className="text-sm text-gray-600 mb-2 shadow-md border-l-8 border-slate-400 border-t-2 p-3 rounded-2xl">
        <strong>Business:</strong> {inquiry.businessName || 'N/A'}
      </p>
      <p className="text-sm text-gray-600 mb-2 shadow-md border-l-8 border-slate-400 border-t-2 p-3 rounded-2xl">
        <strong>Industry:</strong> {inquiry.industry || 'N/A'}
      </p>
      <p className="text-sm text-gray-600 mb-2 shadow-md border-l-8 border-slate-400 border-t-2 p-3 rounded-2xl">
        <strong>Email:</strong> {inquiry.email || 'N/A'}
      </p>
      {inquiry.phone && (
        <p className="text-sm text-gray-600 mb-2 shadow-md border-l-8 border-slate-400 border-t-2 p-3 rounded-2xl">
          <strong>Phone:</strong> {inquiry.phone || 'N/A'}
        </p>
      )}

      <p className="text-sm text-gray-600 mb-2 shadow-md border-l-8 border-slate-400 border-t-2 p-3 rounded-2xl">
        <strong>What Bring You:</strong> {inquiry.whatBringYou || 'N/A'}
      </p>

      <p className="text-sm text-gray-600 mb-2 shadow-md border-l-8 border-slate-400 border-t-2 p-3 rounded-2xl">
        <strong>Focus Area:</strong> {inquiry.focusArea.join(", ") || 'N/A'}
      </p>

      <p className="text-sm text-gray-600 mb-2 shadow-md border-l-8 border-slate-400 border-t-2 p-3 rounded-2xl">
        <strong>Marketing Budget:</strong> {inquiry.marketingBudget.join(", ") || 'N/A'}
      </p>

      <p className="text-sm text-gray-500 mt-4 shadow-md border-l-8 border-slate-400 border-t-2 p-3 rounded-2xl">
        <strong>Created:</strong> {new Date(inquiry.createdAt).toLocaleString() || 'N/A'}
      </p>
    </div>
  );
};

export default InquiryCard;
