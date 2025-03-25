export type InquiryProps = {
  _id: string;
  name: string;
  email: string;
  phone?: string; // Optional field
  businessName: string;
  industry: string;
  whatBringYou: string;
  focusArea: string[];
  marketingBudget: string[];
  acknowledged: boolean
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};


export type CategoryFormValues = {
  categoryName: string;
};