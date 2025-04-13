export interface AboutUsFormValues {
  // title: string;
  body: string;
  aboutUs: string;
  team: {
    name: string;
    link: string;
    role: string;
    profileImage: string;
    description: string;
  }[];
}
