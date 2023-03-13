import { BankAccount, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BankAccount[] | BankAccount>
) {
  if (req.method === "GET") {
    const results = await prisma.bankAccount.findMany();
    res.status(200).json(results);
  }
  if (req.method === "POST") {
    const body = req.body;
    console.log(body);
    const results = await prisma.bankAccount.create({ data: body });
    res.status(200).json(results);
    //
  }
  if (req.method === "PUT") {
    const body = req.body;
    console.log(body);
    const results = await prisma.bankAccount.update({
      data: body,
      where: { id: Number(body.id) },
    });
    res.status(200).json(results);
  }
}
