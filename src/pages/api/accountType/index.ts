import { AccountType, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AccountType[] | AccountType>
) {
  if (req.method === "GET") {
    const results = await prisma.accountType.findMany();
    res.status(200).json(results);
  }
  if (req.method === "POST") {
    const body = req.body;
    console.log(body);
    const results = await prisma.accountType.create({ data: body });
    res.status(200).json(results);
  }
  if (req.method === "PUT") {
    const body = req.body;
    console.log(body);
    const results = await prisma.accountType.update({
      data: body,
      where: { id: Number(body.id) },
    });
    res.status(200).json(results);
  }
}
