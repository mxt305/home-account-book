import { BankAccount, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import validateServerSide from "@/lib/validateServerSide";
import { createCommonValidation } from "@/validation";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BankAccount[] | BankAccount | string>
) {
  if (req.method === "GET") {
    const results = await prisma.bankAccount.findMany();
    res.status(200).json(results);
  }
  if (req.method === "POST") {
    const body = req.body;
    validateServerSide(body, createCommonValidation)
      .then(async () => {
        const results = await prisma.member.create({ data: body });
        res.status(200).json(results);
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  }
  if (req.method === "PUT") {
    const body = req.body;
    validateServerSide(body, createCommonValidation, true)
      .then(async () => {
        const results = await prisma.bankAccount.update({
          data: body,
          where: { id: Number(body.id) },
        });
        res.status(200).json(results);
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  }
}
