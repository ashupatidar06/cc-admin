export type StoryBlock = {
  title: string;
  image: string;
  head: string;
  date: string;
  para1: string;
  para2: string;
  blockquote: string;
  para3: string;
  bullets: string[];
  para4: string;
  _id: string
};

export type StoryFormValues = {
  data: StoryBlock[];
};
