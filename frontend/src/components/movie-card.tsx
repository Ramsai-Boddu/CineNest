import "./movie-card.css";

type Movie = {
  id: string;
  title: string;
  moviePic?: string | null;
  rating: number;
};

type Props = {
  movie: Movie;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
};

const MovieCard = ({ movie, onUpdate, onDelete }: Props) => {
  const imageUrl =
    movie.moviePic && movie.moviePic.trim() !== ""
      ? movie.moviePic
      : "/noprofile.png";

  return (
    <div className="movie-card">
      
      <img
        src={imageUrl}
        alt={movie.title}
        className="movie-img"
        onError={(e) => (e.currentTarget.src = "/noprofile.png")}
      />

      <div className="rating-badge">
        ⭐ {movie.rating}/10
      </div>

      <h3 className="movie-title">{movie.title}</h3>

      <div className="movie-actions">
        <button
          className="update-btn"
          onClick={() => onUpdate(movie.id)}
        >
          Update
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(movie.id)}
        >
          Delete
        </button>
      </div>

    </div>
  );
};

export default MovieCard;