export type PostType = {
  title: string;
  id: string;
  updatedAt?: string;
  user: {
    name: string;
    id: string;
    email: string;
    image: string;
  };
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
};
