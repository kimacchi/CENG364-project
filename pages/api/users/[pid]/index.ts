import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../types/app_context";
import { addToWatchlist, getUser, removeFromWatchlist } from "../../../../lib/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { pid } = req.query;
  switch (req.method) {
    case "GET":
      var user = await getUser(pid as string);
      return res
        .status(200)
        .json(user.length > 0 ? user[0] : { error: "user not found" });
    case "PATCH":
      var user = await addToWatchlist(req.body.id, req.body.movie);
      return res
        .status(200)
        .json(user.length > 0 ? user[0] : { error: "user not found" });
    case "PUT":
      var user = await removeFromWatchlist(req.body.id, req.body.movie);
      return res
        .status(200)
        .json(user.length > 0 ? user[0] : { error: "user not found" });
    default:
      return res.status(405);
  }
}
