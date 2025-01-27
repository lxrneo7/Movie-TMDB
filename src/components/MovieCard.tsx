import { Star } from "lucide-react";
import { Movie } from "@/services/tmdb";
import { Link } from "react-router-dom";
import { tmdb } from "@/services/tmdb";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="group block relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
    >
      <div className="relative aspect-[2/3]">
        <img
          src={tmdb.getImageUrl(movie.poster_path, "w500")}
          alt={movie.title}
          className="w-full h-full object-cover rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-neon-blue transition-colors">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-neon-blue" />
              <span className="text-neon-blue font-medium">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-movie-300">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};