import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "@/lib/session";

export default withIronSessionApiRoute(userCheckRoute, sessionOptions);

async function userCheckRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  const user = req.session.user;
  if (user) {
    res.json(user);
  } else {
    res.send("not login");
  }
}
