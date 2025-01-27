import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { tmdb } from "@/services/tmdb";
import { MovieList } from "@/components/MovieList";
import { Navbar } from "@/components/Navbar";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: movies, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => tmdb.searchMovies(query),
    enabled: !!query,
  });

  return (
    <div className="min-h-screen bg-movie-950">
      <Navbar />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-8">
          Результаты поиска: {query}
        </h1>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-movie-300"></div>
          </div>
        ) : movies?.length ? (
          <MovieList title="" movies={movies} />
        ) : (
          <p className="text-center text-movie-400">
            Ничего не найдено
          </p>
        )}
      </main>
    </div>
  );
};

export default Search;