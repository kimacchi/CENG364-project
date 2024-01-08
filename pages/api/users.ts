import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../types/app_context";
import { addToWatchlist } from "../../lib/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET":
      return res.status(200).json({ username: "test", id: "1", watchlist: [] });
    case "PATCH":
        const user = await addToWatchlist(req.body.id, req.body.movie);

        return res.status(200).json(user.length > 0 ? user[0] : {error: "user not found"});
    default:
      return res.status(405);
  }
}
