export type MotionCult = {
  _id: string;
  body: string;
  Dilemma: {
    title: string;
    body: string;
  };
  motion: {
    title: string;
    body: string;
  };
  quoteTitle: string;
  carousel: string[];
  workImg: string[];
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type MotionCultFormValues = {
  body: string;
  Dilemma: {
    title: string;
    body: string;
  };
  motion: {
    title: string;
    body: string;
  };
  quoteTitle: string;
  carousel: string[];
  workImg: string[];
};
