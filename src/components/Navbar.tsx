import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-neon-blue/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="text-2xl font-bold neon-text">
            MovieApp
          </Link>
          <SearchBar />
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="hover:text-neon-blue transition-colors duration-300"
            >
              Главная
            </Link>
            <Link 
              to="/upcoming" 
              className="hover:text-neon-blue transition-colors duration-300"
            >
              Скоро
            </Link>
            <Link 
              to="/top-rated" 
              className="hover:text-neon-blue transition-colors duration-300"
            >
              Топ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};