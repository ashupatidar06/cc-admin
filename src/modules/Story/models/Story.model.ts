export type StoryBlock = {
  title: string;
  image: string;
  body: string;
  date: string
  _id: string
};

export type StoryFormValues = {
  data: StoryBlock[];
};
