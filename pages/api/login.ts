import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../types/app_context";
import { addToWatchlist, login } from "../../lib/user";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    switch (req.method) {
        case "GET":
        return res.status(200).json({ username: "test", id: 1 });
        case "POST":
          const user = await login(req.body.username, req.body.password)
          return res.status(200).json(user.length > 0 ? user[0] : {error: "invalid username or password"});
        default:
        return res.status(405);
    }
}
