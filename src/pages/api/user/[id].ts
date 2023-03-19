import { User, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { id } = req.query;
  if (typeof id !== "string" || id.length < 15 || id.length > 35) {
    res.status(404);
    return;
  }
  if (req.method === "GET") {
    try {
      const results = await prisma.user.findFirstOrThrow({
        where: { id },
      });
      res.status(200).json(results);
    } catch (err) {
      res.status(404);
    }
  }
  if (req.method === "DELETE") {
    const record = await prisma.user.findFirstOrThrow({
      where: { id },
    });
    if (record.username === "admin") {
      res.status(404);
    }
    try {
      const results = await prisma.user.delete({
        where: { id },
      });
      res.status(200).json(results);
    } catch (err) {
      res.status(404);
    }
  }
}
