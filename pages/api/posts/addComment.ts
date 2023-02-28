// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

// has request and response
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Getting into Add Comment");
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res.status(401).json({ message: "Please Sign In to make a post" });

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    try {
      const { title, postId } = req.body.data;

      if (!title.length) {
        res.status(401).json({ message: "Please dont leave this empty" });
      }

      const result = await prisma.comment.create({
        data: {
          message: title,
          userId: prismaUser?.id,
          postId,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res
        .status(403)
        .json({ message: "Error has occured while making Comment" });
    }
  }
}
