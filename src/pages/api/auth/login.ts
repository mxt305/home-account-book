import { PrismaClient } from "@prisma/client";
import { SHA256 } from "crypto-js";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "@/lib/session";

const prisma = new PrismaClient();

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body;
  try {
    const user = await prisma.user.findFirst({
      where: { username },
    });
    if (user) {
      if (user.password === SHA256(password).toString()) {
        req.session.user = {
          ...user,
          password: "",
        };
        await req.session.save();
        res.json(user);
      } else {
        return res.status(500).send("user not found");
      }
    } else {
      return res.status(500).send("user not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("login failed");
  }
}
