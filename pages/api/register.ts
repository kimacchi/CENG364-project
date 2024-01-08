import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../types/app_context";
import { addToWatchlist, login, register } from "../../lib/user";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    switch (req.method) {
        case "POST":
          const registered = await register(req.body.username, req.body.password)
          const user = await login(req.body.username, req.body.password)
          return res.status(200).json(user.length > 0 ? user[0] : {error: "invalid username or password"});
        default:
        return res.status(405);
    }
}
