const TMDB_API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c"; // This is for demo purposes only
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };
  videos: {
    results: {
      key: string;
      type: string;
    }[];
  };
}

export const tmdb = {
  getImageUrl: (path: string, size: string = "original") => 
    path ? `${IMAGE_BASE_URL}/${size}${path}` : "/placeholder.svg",

  getPopularMovies: async (): Promise<Movie[]> => {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=ru-RU`
    );
    const data = await response.json();
    return data.results;
  },

  getUpcomingMovies: async (): Promise<Movie[]> => {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=ru-RU`
    );
    const data = await response.json();
    return data.results;
  },

  getTopRatedMovies: async (): Promise<Movie[]> => {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=ru-RU`
    );
    const data = await response.json();
    return data.results;
  },

  getMovieDetails: async (id: string): Promise<MovieDetails> => {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos&language=ru-RU`
    );
    const data = await response.json();
    return data;
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}&language=ru-RU`
    );
    const data = await response.json();
    return data.results;
  },
};