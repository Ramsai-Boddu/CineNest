import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/movie-card";
import { useNavigate } from "react-router-dom";
import "./css/get-movies.css";

type Movie = {
  id: string;
  title: string;
  moviePic?: string | null;
  rating: number;
};

const GetSuperMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

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

      console.log("API RESPONSE:", res.data);

      setMovies(res.data.data || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete this movie?");
    if (!confirmDelete) return;

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

  return (
    <div className="movies-container">
      <h2>My Movies 🎬</h2>

      <div className="movies-grid">
        {movies?.length > 0 ? (
          movies.map((movie) => (
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

export default GetSuperMovies;