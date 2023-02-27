"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Toggle from "./Toggle";
import { toast } from "react-hot-toast";

type EditProps = {
  key: string;
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  //toggle
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  let deleteToastId: string;
  //Delete Post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("api/posts/deletePost", { data: id }),
    {
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting that post", { id: deleteToastId });
      },
      onSuccess: (data) => {
        console.log(data);
        toast.success("Post has been deleted", { id: deleteToastId });
        queryClient.invalidateQueries(["auth-post"]);
      },
    }
  );

  const deletePost = () => {
    deleteToastId = toast.loading("We are deleting your post", {
      id: deleteToastId,
    });
    mutate(id);
  };

  return (
    <>
      <div className="bg-white p-8 my-8 rounded-lg ">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="text-gray-500">{name}</h3>
        </div>
        <div className="py-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex gap-2 items-center">
          <p>{comments?.length} Comments</p>
          <button
            onClick={(e) => {
              setToggle(true);
            }}
            className="font-sm text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
