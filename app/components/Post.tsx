"use client";
import Image from "next/image";
import Link from "next/link";
import { PostType } from "../types/PostType";

export default function Post({ id, avatar, name, postTitle, comments }) {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt=""
        />
        <h3 className="text-gray-500">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div>
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">{comments?.length}</p>
        </Link>
      </div>
    </div>
  );
}
