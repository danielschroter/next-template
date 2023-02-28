import prisma from "../../../prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";

// has request and response
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Reaching Backend");
  if (req.method === "GET") {
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: req.query.details,
        },
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          },
        },
      });
      return res.status(200).json(data);
    } catch (err) {
      res
        .status(403)
        .json({ err: "Error has occured during fetching authorized posts" });
    }
  }
}
