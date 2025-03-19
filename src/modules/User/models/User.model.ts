export type User = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  userName: string;
  phone: string;
  userType: string;
  salaryPerDay: string;
  subsrcriptionStartDate: string;
  subsrcriptionEndDate: string;
  isSubscriptionValid: string;
  companyCode: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export enum UserEnum {
  Admin = "ADMIN",
  Employee = "EMPLOYEE",
  superAdmin = "SUPERADMIN",
}

export type UserFormValues = {
  fullName: string;
  email: string;
  password: string;
  userName: string;
  phone: string;
  userType: string;
  salaryPerDay: string;
  // subsrcriptionStartDate: string;
  // subsrcriptionEndDate: string;
  // isSubscriptionValid: string;
  companyCode: string;
};
