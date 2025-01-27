import { Movie } from "@/services/tmdb";
import { MovieCard } from "./MovieCard";
import { cn } from "@/lib/utils";

interface MovieListProps {
  title: string;
  movies: Movie[];
  className?: string;
}

export const MovieList = ({ title, movies, className }: MovieListProps) => {
  return (
    <section className={cn("py-8", className)}>
      <h2 className="text-2xl font-semibold mb-6 animate-fade-in">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="animate-fade-in"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
};