export type FormInputPost = {
  title: string;
  content: string;
  tagId: string;
  tag: {
    id: string;
    name: string;
  };
};
