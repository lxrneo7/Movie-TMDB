import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { MovieList } from "@/components/MovieList";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  const { data: popularMovies, isLoading: loadingPopular } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: tmdb.getPopularMovies,
  });

  const { data: upcomingMovies, isLoading: loadingUpcoming } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: tmdb.getUpcomingMovies,
  });

  const { data: topRatedMovies, isLoading: loadingTopRated } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: tmdb.getTopRatedMovies,
  });

  if (loadingPopular || loadingUpcoming || loadingTopRated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-movie-300"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-movie-950">
      <Navbar />
      <main className="container mx-auto px-4 pt-24">
        {popularMovies && (
          <MovieList title="Популярные фильмы" movies={popularMovies} />
        )}
        {upcomingMovies && (
          <MovieList title="Скоро в кино" movies={upcomingMovies} />
        )}
        {topRatedMovies && (
          <MovieList title="Лучшие фильмы" movies={topRatedMovies} />
        )}
      </main>
    </div>
  );
};

export default Index;