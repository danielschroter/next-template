"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type PostProps = {
  id?: string;
};

type Comment = {
  postId?: string;
  title: string;
};

export default function AddComment({ id }: PostProps) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastId: string;

  const { mutate } = useMutation(
    async (data: Comment) =>
      await axios.post("/api/posts/addComment", { data: data }),
    {
      onSuccess: (data) => {
        setTitle("");
        setIsDisabled(false);
        queryClient.invalidateQueries(["detail-post"]);
        toast.success("Added your comment", { id: commentToastId });
      },
      onError: (error) => {
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId });
        }
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    commentToastId = toast.loading("Adding your comment", {
      id: commentToastId,
    });
    mutate({ title, postId: id });
  };

  return (
    <form onSubmit={submitComment} className="my-8">
      <h3>Add a comment</h3>
      <div className="flex flex-col gap-2 my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="rounded-md p-4 text-lg my-2"
        />
      </div>
      <div className="flex flex-row-reverse justify-between items-start">
        <button
          disabled={isDisabled}
          type="submit"
          className="bg-teal-800 px-3 py-2 rounded-lg text-white"
        >
          Add Comment 🚀
        </button>
        <p
          className={`${title.length > 300 ? "text-red-500" : "text-gray-500"}`}
        >
          {`${title.length}/300`}
        </p>
      </div>
    </form>
  );
}
