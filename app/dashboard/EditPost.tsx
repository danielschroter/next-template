"use client";

import Image from "next/image";
import { useState } from "react";

type EditProps = {
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
  return (
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
        <button className="font-sm text-red-500">Delete</button>
      </div>
    </div>
  );
}
