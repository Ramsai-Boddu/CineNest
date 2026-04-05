import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/movie-card.tsx";
import { useNavigate } from "react-router-dom";
import "./css/get-movies.css";

type Movie = {
  id: string;
  title: string;
  genre: string;
  moviePic?: string | null;
  rating: number;
};

const GetMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [selectedRating, setSelectedRating] = useState<string>("All"); // ✅ NEW
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  const getMovies = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/admin/get-movie/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMovies(res.data.movies);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this movie?")) return;

    try {
      await axios.delete(
        `http://localhost:3000/admin/delete-movie/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMovies((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`/update-movie/${id}`);
  };

  // ✅ Genres
  const genres = ["All", ...new Set(movies.map((m) => m.genre))];

  // ✅ Rating options
  const ratings = ["All", "9", "8", "7", "6", "5", "4", "3", "2", "1"];

  // ✅ Combined Filter (Genre + Rating + Search 🔥)
  const filteredMovies = movies.filter((movie) => {
    const matchesGenre =
      selectedGenre === "All" || movie.genre === selectedGenre;

    const matchesRating =
      selectedRating === "All" ||
      Math.floor(movie.rating) === Number(selectedRating);

    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesGenre && matchesRating && matchesSearch;
  });

  return (
    <div className="movies-container">
      <h2>My Movies 🎬</h2>

      {/* 🔥 TOP BAR */}
      <div className="top-bar">
        
        {/* LEFT SIDE FILTERS */}
        <div className="filter-bar">
          
          {/* GENRE */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          {/* ⭐ RATING */}
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
          >
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating === "All" ? "All Ratings" : `${rating}+ ⭐`}
              </option>
            ))}
          </select>

        </div>

        {/* RIGHT - SEARCH */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

      </div>

      {/* MOVIES */}
      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default GetMovies;