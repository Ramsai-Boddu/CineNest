import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./css/update-movies.css";
import { toast, ToastContainer } from "react-toastify";

const UpdateMovie = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const [form, setForm] = useState({
    title: "",
    director: "",
    genre: "",
    releaseYear: "",
    rating: "",
    review: "",
    cast: "",
    status: "Not Completed",
    
  });

  const [moviePic, setMoviePic] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/admin/get-movieById/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const movie = res.data.movie;

        setForm({
          title: movie?.title ?? "",
          director: movie?.director ?? "",
          genre: movie?.genre ?? "",
          releaseYear: movie?.releaseYear?.toString() ?? "",
          rating: movie?.rating?.toString() ?? "",
          review: movie?.review ?? "",
          cast: movie?.cast ?? "",
          status: movie?.status ?? "Not Completed",
        });

        setMoviePic(movie?.moviePic ?? null);
      } catch (err) {
        console.error(err);
      } finally {
        setFetchLoading(false);
      }
    };

    if (movieId) fetchMovie();
  }, [movieId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setMoviePic(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (file) {
        formData.append("file", file);
      }

      await axios.put(
        `http://localhost:3000/admin/update-movie/${movieId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Movie updated successfully ✅");
    } catch (err) {
      console.error(err);
      toast.error("Update failed ❌");
    }

    setLoading(false);
  };

  if (fetchLoading) return <div>Loading movie...</div>;

  return (
    <div className="movie-update-container">
      <h2>Update Movie 🎬</h2>

      <form onSubmit={handleSubmit} className="movie-update-form">
        <div className="movie-image-section">
          <img
            src={moviePic || "/noprofile.png"}
            alt="movie"
            className="movie-preview"
            onError={(e) => (e.currentTarget.src = "/noprofile.png")}
          />
          <input type="file" onChange={handleFileChange} />
        </div>

        <div className="movie-fields">
          <input name="title" value={form.title} onChange={handleChange} />
          <input name="director" value={form.director} onChange={handleChange} />
          <input name="genre" value={form.genre} onChange={handleChange} />
          <input name="releaseYear" value={form.releaseYear} onChange={handleChange} />
          <input name="rating" value={form.rating} onChange={handleChange} />
          <input name="cast" value={form.cast} onChange={handleChange} />
          <input name="review" value={form.review} onChange={handleChange} />
          
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="not completed">⏳ Not Completed</option>
            <option value="completed">✅ Completed</option>
          </select>

          <button type="submit">
            {loading ? "Updating..." : "Update Movie"}
          </button>
        </div>
      </form>

    </div>
  );
};

export default UpdateMovie;