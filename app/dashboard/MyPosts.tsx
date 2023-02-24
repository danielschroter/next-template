"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPostType } from "@/app/types/AuthPostTypes";
import EditPost from "./EditPost";

const fetchAuthPost = async () => {
  const response = await axios.get("/api/posts/authPost");
  return response.data;
};

export default function MyPosts() {
  const { data, isLoading } = useQuery<AuthPostType>({
    queryFn: fetchAuthPost,
    queryKey: ["auth-post"],
  });

  if (isLoading) return <h1>Loading...</h1>;
  console.log(data);
  return (
    <div>
      {data?.posts?.map((post) => (
        <EditPost
          id={post.id}
          title={post.title}
          comments={post.comments}
          avatar={data.image}
          name={data.name}
        />
      ))}
    </div>
  );
}
