import type { NextApiRequest, NextApiResponse } from "next";
import { TopRatedMovies } from "../../types/movie";
import { createMovie } from "../../lib/movies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET":
      return res.status(200).json({});
    case "POST":
        return res.status(200).json(await createMovie(req.body));
    default:
      return res.status(405);
  }
}
