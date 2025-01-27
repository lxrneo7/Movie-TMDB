import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск фильмов..."
        className="w-full px-4 py-2 pl-10 bg-movie-800 border border-movie-700 rounded-lg focus:outline-none focus:border-movie-600 transition-colors"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-movie-400 w-4 h-4" />
    </form>
  );
};