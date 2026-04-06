import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./css/movie-details.css";

type Movie = {
  id: string;
  title: string;
  director?: string;
  genre: string;
  moviePic?: string;
  rating: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  review?: string;
  cast?: string;
  status?: string;
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/admin/get-movieById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const movieData =
          res.data?.movie ||
          res.data?.data ||
          res.data;

        setMovie(movieData);
      } catch (err) {
        console.error("Error fetching movie:", err);
        setMovie(null);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const imageUrl =
    movie.moviePic && movie.moviePic.trim() !== ""
      ? movie.moviePic
      : "/noprofile.png";

  return (
    <div className="movie-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="movie-details-card">
        <img
          src={imageUrl}
          alt={movie.title}
          className="movie-details-img"
          onError={(e) => (e.currentTarget.src = "/noprofile.png")}
        />

        <div className="movie-info">
          <p><strong>Movie Name:</strong> {movie.title}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Rating:</strong> {movie.rating}/10</p>
          <p><strong>Cast:</strong> {movie.cast}</p>
          <p><strong>Status:</strong> {movie.status}</p>
          <p><strong>Review:</strong> {movie.review}</p>

          {movie.description && (
            <p><strong>Description:</strong> {movie.description}</p>
          )}

          <div className="action-buttons">
            <button
              className="update-btn"
              onClick={() => navigate(`/update-movie/${movie.id}`)}
            >
              Update
            </button>

            <button
              className="delete-btn"
              onClick={() => {
                if (window.confirm("Delete this movie?")) {
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;