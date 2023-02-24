"use client";
import { useState } from "react";
import "./AddPost.css";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  let toastPostId: string;

  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostId });
        }
        setIsDisabled(false);
        return 200;
      },
      onSuccess: (data) => {
        toast.success("Post has been made 🔥", { id: toastPostId });
        setTitle("");
        setIsDisabled(false);
      },
    }
  );
  // Specify e in typescript -> FormEvent
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostId = toast.loading("Creating your Post");
    console.log("Getting here"); // prevents refreshing when pressing button
    setIsDisabled(true);
    let resp = mutate(title);
    console.log("HELLOO TEST");
    console.log(resp);
    setIsDisabled(false);
  };

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 form-identifier">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder={"Whats in your mind?"}
          className="p-6 rounded-full text-white my-2 placeholder-gray-100 bg-gray-700/50"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`target:ext-sm ${
            title.length > 300 ? "text-red-700" : null
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-10"
          type="submit"
        >
          Create a Post
        </button>
      </div>
    </form>
  );
}
