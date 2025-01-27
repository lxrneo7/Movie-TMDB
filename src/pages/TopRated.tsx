import { useQuery } from "@tanstack/react-query";
import { MovieList } from "@/components/MovieList";
import { tmdb } from "@/services/tmdb";
import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/Navbar";

export const TopRated = () => {
  const { data: topRatedMovies, isLoading } = useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: tmdb.getTopRatedMovies,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-movie-950">
        <Navbar />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <Skeleton className="w-full aspect-[2/3] rounded-lg" />
                <Skeleton className="h-4 w-3/4 mt-4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-movie-950">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <MovieList
          title="Топ фильмов"
          movies={topRatedMovies || []}
          className="animate-fade-in"
        />
      </div>
    </div>
  );
};

export default TopRated;