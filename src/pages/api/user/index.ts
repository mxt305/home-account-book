import { User, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import validateServerSide from "@/lib/validateServerSide";
import { createUserValidation } from "@/validation";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | User>
) {
  if (req.method === "GET") {
    const results = await prisma.user.findMany();
    res.status(200).json(results);
  }
  if (req.method === "POST") {
    const body = req.body;
    validateServerSide(body, createUserValidation)
      .then(async () => {
        const results = await prisma.user.create({ data: body });
        res.status(200).json(results);
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  }
  if (req.method === "PUT") {
    const body = req.body;
    delete body.username;
    delete body.password;
    validateServerSide(body, createUserValidation, true)
      .then(async () => {
        const results = await prisma.user.update({
          data: body,
          where: { id: body.id },
        });
        res.status(200).json(results);
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  }
}
