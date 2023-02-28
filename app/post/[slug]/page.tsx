"use client";

import Post from "@/app/components/Post";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "@/app/types/Post";
import axios from "axios";
import AddComment from "@/app/components/AddComment";
import Image from "next/image";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });

  if (isLoading) return "Loading...";
  console.log("This is the response dasta:", data);
  return (
    <div>
      <Post
        id={data?.id}
        name={data.user.name}
        avatar={data.user.image}
        postTitle={data.title}
        comments={data.comments}
      ></Post>
      <AddComment id={data.id} />
      {data?.comments?.map((comment) => (
        <div key={comment.id} className="my-6 bg-white rounded-md p-6">
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              width={24}
              height={24}
              src={comment.user?.image}
              alt="avatar"
            ></Image>
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="my-3">{comment.message}</div>
        </div>
      ))}
    </div>
  );
}
