import { Member, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Member>
) {
  const { id } = req.query;
  const nId = Number(id);
  if (Number.isNaN(nId)) {
    res.status(404);
    return;
  }
  if (req.method === "GET") {
    try {
      const results = await prisma.member.findFirstOrThrow({
        where: { id: Number(id) },
      });
      res.status(200).json(results);
    } catch (err) {
      res.status(404);
    }
  }
  if (req.method === "DELETE") {
    try {
      const results = await prisma.member.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(results);
    } catch (err) {
      res.status(404);
    }
  }
}
