import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/movie-card";
import { useNavigate } from "react-router-dom";
import "./css/get-movies.css";

type Movie = {
  id: string;
  title: string;
  genre: string;
  moviePic?: string | null;
  rating: number;
};

const GetSuperMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [selectedRating, setSelectedRating] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const genres = ["All", ...new Set(movies.map((m) => m.genre))];
  const ratings = ["All", "9", "8", "7", "6", "5", "4", "3", "2", "1"];

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

  const role = localStorage.getItem("role") || "";



  const getMovies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/super-admin/movies",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMovies(res.data.data || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const url = role === "admin"
    ? "http://localhost:3000/super-admin/delete-movie"
    : "http://localhost:3000/admin/delete-movie";

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this movie?")) return;

    try {
      await axios.delete(
        `${url}/${id}`,
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

  const handleView = (id: string) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="movies-container">
      <h2>My Movies 🎬</h2>

      <div className="top-bar">
        <div className="filter-bar">
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

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onView={handleView}
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

export default GetSuperMovies;