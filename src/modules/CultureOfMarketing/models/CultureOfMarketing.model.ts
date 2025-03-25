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

export interface CultureOfMarketingFormValues {
  // title: string;
  body: string;
  theChallenge?: {
    img: string;
    title: string;
    body: string;
  };
  middleBanner?: {
    img: string;
    title: string;
  };
  theResearch?: {
    img: string;
    title: string;
    body: string;
  };
  theSolution?: {
    img: string;
    title: string;
    body: string;
  };
}
