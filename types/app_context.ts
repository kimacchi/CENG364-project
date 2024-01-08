import { TopRatedMovies } from "./movie";

export interface User{
    username: string;
    id: string;
    watchlist: string[];
}

export interface AppContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}