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
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please Sign in" });
    // Delete a Post
    try {
      const postId = req.body;
      const result = await prisma.post.delete({ where: { id: postId } });
      return res.status(200).json(result);
    } catch (err) {
      res.status(403).json({
        err: "Error has occured during deleting a post",
      });
    }
  }
}
