import "./movie-card.css";

type Movie = {
  id: string;
  title: string;
  genre: string;
  moviePic?: string | null;
  rating: number;
};

type Props = {
  movie: Movie;
  onView: (id: string) => void;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
};

const MovieCard = ({ movie, onView, onUpdate, onDelete }: Props) => {
  const imageUrl =
    movie.moviePic && movie.moviePic.trim() !== ""
      ? movie.moviePic
      : "/noprofile.png";

  return (
    <div
      className="movie-card"
      onClick={() => onView(movie.id)}
    >
      <div className="image-wrapper">
        <img
          src={imageUrl}
          alt={movie.title}
          className="movie-img"
          onError={(e) => (e.currentTarget.src = "/noprofile.png")}
        />

        <div className="rating-badge">
          ⭐ {movie.rating}/10
        </div>
      </div>

      <div className="movie-content">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-genre">{movie.genre}</p>

        <div className="movie-actions">
          <button
            className="update-btn"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate(movie.id);
            }}
          >
            Update
          </button>

          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(movie.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;