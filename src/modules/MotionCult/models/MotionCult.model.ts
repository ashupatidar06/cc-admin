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
  workImg: {
    image_path: string;
    org_path: string;
  }[]; // updated to array of objects
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
    workImg: {
      image_path: string;
      org_path: string;
    }[]; // updated to array of objects
  };

