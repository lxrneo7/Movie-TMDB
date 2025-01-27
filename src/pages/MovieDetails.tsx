import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { tmdb } from "@/services/tmdb";
import { Star, Clock, Calendar } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => tmdb.getMovieDetails(id!),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-movie-300"></div>
      </div>
    );
  }

  if (!movie) return null;

  const trailer = movie.videos.results.find(
    (video) => video.type === "Trailer"
  );

  return (
    <div className="min-h-screen bg-movie-950">
      <Navbar />
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${tmdb.getImageUrl(movie.backdrop_path)})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-movie-950 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 pt-32 pb-16">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={tmdb.getImageUrl(movie.poster_path, "w500")}
              alt={movie.title}
              className="rounded-lg shadow-xl w-full md:w-96 object-cover"
            />
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4 text-shadow">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-xl text-movie-300 mb-6 italic text-shadow">
                  {movie.tagline}
                </p>
              )}
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold" />
                  <span className="text-gold font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-movie-300" />
                  <span className="text-movie-300">
                    {movie.runtime} мин
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-movie-300" />
                  <span className="text-movie-300">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Описание</h2>
                <p className="text-movie-200 leading-relaxed">{movie.overview}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Жанры</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 rounded-full bg-movie-800 text-movie-200"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              
              {movie.credits.cast.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">В главных ролях</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {movie.credits.cast.slice(0, 4).map((actor) => (
                      <div key={actor.id} className="text-center">
                        <img
                          src={
                            actor.profile_path
                              ? tmdb.getImageUrl(actor.profile_path, "w185")
                              : "/placeholder.svg"
                          }
                          alt={actor.name}
                          className="w-32 h-32 rounded-full object-cover mx-auto mb-2"
                        />
                        <p className="font-semibold">{actor.name}</p>
                        <p className="text-movie-400 text-sm">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {trailer && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Трейлер</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  allowFullScreen
                  className="rounded-lg w-full h-[600px]"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;