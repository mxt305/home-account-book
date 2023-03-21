import { AccountData, PrismaClient } from "@prisma/client";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "@/lib/session";
import validateServerSide from "@/lib/validateServerSide";
import { createAccountDataValidation } from "@/validation";

const prisma = new PrismaClient();

export default withIronSessionApiRoute(accountDataRoute, sessionOptions);

async function accountDataRoute(
  req: NextApiRequest,
  res: NextApiResponse<AccountData[] | AccountData>
) {
  const user = req.session.user;
  console.log(user);
  if (req.method === "GET") {
    const results = await prisma.accountData.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).json(results);
  }
  if (req.method === "POST") {
    const body = req.body;
    validateServerSide(body, createAccountDataValidation)
      .then(async () => {
        const results = await prisma.accountData.create({
          data: { ...body, createdBy: user?.id || "" },
        });
        res.status(200).json(results);
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  }
  if (req.method === "PUT") {
    const body = req.body;
    validateServerSide(body, createAccountDataValidation, true)
      .then(async () => {
        const results = await prisma.accountData.update({
          data: { ...body, updatedBy: user?.id || "" },
          where: { id: body.id },
        });
        res.status(200).json(results);
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  }
}
