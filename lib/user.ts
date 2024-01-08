import { User } from "../types/app_context";
import { TopRatedMovies } from "../types/movie";
import sql from "./db";

export async function getUser(id: string) {
  const res = await sql<User[]>`
      SELECT id, username, watchlist FROM users
      WHERE id = ${id}
    `;
  return res;
}

export async function login(username: string, password: string) {
  const res = await sql<User[]>`
      SELECT id, username, watchlist FROM users
      WHERE username = ${username} AND password = ${password}
    `;
  return res;
}

export async function register(username: string, password: string) {
  const res = await sql<User[]>`
      INSERT INTO users (id, username, password) VALUES (${crypto.randomUUID()}, ${username}, ${password})
      RETURNING id, username
    `;
  return res;
}

export async function addToWatchlist(id: string, movie: string) {
  const res = await sql<User[]>`
        UPDATE users SET watchlist = array_append(watchlist, ${movie})
        WHERE id = ${id}
        RETURNING id, username, watchlist
        `;
  return res;
}
export async function removeFromWatchlist(id: string, movie: string) {
  const res = await sql<User[]>`
        UPDATE users SET watchlist = array_remove(watchlist, ${movie})
        WHERE id = ${id}
        RETURNING id, username, watchlist
        `;
  return res;
}
