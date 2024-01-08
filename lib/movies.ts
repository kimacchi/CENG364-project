import { TopRatedMovies } from "../types/movie";
import sql from "./db";


export async function createMovie(data: TopRatedMovies) {
    try {
        const movies = await sql<TopRatedMovies[]>`SELECT * FROM movies WHERE id = ${data.id}`
        if(movies.length! > 0) {return {error: "already exists"}}
        else{
            console.log(data)
            const res = await sql<TopRatedMovies[]>`
                INSERT INTO movies
                (id, adult, backdrop_path, genre_ids, media_type, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count)
                VALUES (${data.id}, 
                        ${data.adult},
                        ${data.backdrop_path},
                        ${data.genre_ids},
                        ${data.media_type || ""},
                        ${data.original_title},
                        ${data.overview || ""},
                        ${data.popularity},
                        ${data.poster_path},
                        ${data.release_date},
                        ${data.title},
                        ${data.video},
                        ${data.vote_average || 0},
                        ${data.vote_count}
                        )
            `;
            console.log(res)
            return res;
        }
    } catch (error) {
        return {error: error}
    }
  }

export async function getWatchlist(watchlist: number[] = []) {
    try {
        // const temp = watchlist.map((item) => parseInt(item))
        const movies = await sql<TopRatedMovies[]>`SELECT * FROM movies WHERE id IN ${sql(watchlist)}`
        return movies;
    } catch (error) {
        return {error: error}
    }
}