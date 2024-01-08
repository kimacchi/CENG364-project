import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../types/app_context";
import { addToWatchlist, getUser, removeFromWatchlist } from "../../../../lib/user";
import { getWatchlist } from "../../../../lib/movies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { pid } = req.query;
  switch (req.method) {
    case "POST":
      var watchlist = await getWatchlist(req.body.watchlist);
      return res
        .status(200)
        .json(watchlist);
    default:
      return res.status(405);
  }
}
