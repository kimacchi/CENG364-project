import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { AppContext } from "../_app";
import { User } from "../../types/app_context";
import { TopRatedMovies } from "../../types/movie";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { Input } from "@nextui-org/react";

const Home = () => {
  const router = useRouter();

  const { user, setUser } = useContext(AppContext);

  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [movies, setMovies] = useState<TopRatedMovies[]>([]);
  useEffect(() => {
    console.log(user);
    if (user) {
      const getUser = async () => {
        const res = await axios.get<any, AxiosResponse<User>>(
          `/api/users/${user.id}`
        );

        setWatchlist(res.data.watchlist.map((e) => parseInt(e)) || []);
      };
      getUser();
    }
  }, [user]);

  useEffect(() => {
    const getMovies = async () => {
      console.log(watchlist);
      const res = await axios.post<any, AxiosResponse<TopRatedMovies[]>>(
        `/api/users/watchlist`,
        { watchlist }
      );
      console.log(res.data);
      setMovies(res.data);
    };
    getMovies();
  }, [watchlist]);

  const includesMovie = (id: number) => {
    return watchlist.includes(id);
  };


  const [search, setSearch] = useState<string>("");
  return (
    <div className="bg-zinc-800 w-full min-h-screen text-white pb-8 flex flex-col items-center dark">
      <div className="flex items-center w-full bg-zinc-800/70 backdrop-blur-md h-24 fixed z-[1000000] px-16 justify-between">
        <a href="#" className="text-3xl">
          MyMovieList
        </a>
        <Input
          label="Search a movie..."
          variant="bordered"
          labelPlacement="inside"
          size="sm"
          className="w-1/2"
          value={search}
          onValueChange={(e) => setSearch(e)}
          onKeyDown={(e) => {
            if(e.code === "Enter"){
              router.push({
                pathname: "/",
                query: { query:  search},
              });
            }
          }}
          endContent={
            <button className="h-full flex items-center justify-center" onClick={() => {
              router.push({
                pathname: "/",
                query: { query: search},
              });
            }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          }
        />
        <Link href={user ? "/watchlist" : "/login"} className="text-xl">
          {user ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          ) : (
            "Login"
          )}
        </Link>
      </div>
      <h1 className="text-3xl mt-24">Your Watchlist</h1>
      <div className="flex flex-wrap justify-center gap-6 mt-24">
        {movies.map((movie: TopRatedMovies) => {
          return (
            <div key={uuidv4()} className="relative flex justify-center group">
              {!includesMovie(movie.id) ? (
                <button
                  onClick={async () => {
                    if (!user) router.push("/login");
                    else {
                      setUser({
                        id: user.id,
                        username: user.username,
                        watchlist: [`${movie.id}`, ...user.watchlist],
                      });
                      const res = await axios.patch<any, AxiosResponse<User>>(
                        "/api/users/",
                        {
                          id: user.id,
                          movie: movie.id,
                        }
                      );
                      setUser(res.data);
                    }
                  }}
                  className="transition-all bg-black rounded-full drop-shadow-2xl absolute z-50 -right-6 group-hover:right-6 top-6  hidden group-hover:block hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="white"
                    className="bi bi-plus-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={async () => {
                    if (!user) router.push("/login");
                    else {
                      setUser({
                        id: user.id,
                        username: user.username,
                        watchlist: [`${movie.id}`, ...user.watchlist],
                      });
                      const res = await axios.put<any, AxiosResponse<User>>(
                        "/api/users/" + user.id,
                        {
                          id: user.id,
                          movie: movie.id,
                        }
                      );
                      setUser(res.data);
                    }
                  }}
                  className="transition-all bg-white border-1 border-white rounded-full drop-shadow-2xl absolute z-50 -right-6 group-hover:right-6 top-6  hidden group-hover:block hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#851d30"
                    className="bi bi-dash-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
                  </svg>
                </button>
              )}
              <a
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_MOVIE_PATH}${movie.id}`}
                className=" w-72 aspect-[6/9] transition-all relative flex justify-center"
              >
                <div className="w-full h-full absolute z-[5] transition-all bg-overly rounded-xl group-hover:bg-overly-hidden" />
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${movie.poster_path}`}
                  alt={movie.title}
                  className="absolute w-full h-full rounded-xl z-[4]"
                />
                <h1 className="absolute bottom-0 z-10 text-center p-4 pt-72 w-full group-hover:hidden transition-all">
                  {movie.title}
                </h1>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
