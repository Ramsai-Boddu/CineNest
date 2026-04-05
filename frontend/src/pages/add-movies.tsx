import axios from "axios";
import { useState } from "react";
import "./css/add-movie.css";
import { toast, ToastContainer } from "react-toastify";

const AddMovie = () => {
    const [form, setForm] = useState({
        title: "",
        director: "",
        genre: "",
        releaseYear: "",
        rating: "",
        review: "",
        cast: "",
        status: "not completed",
    });

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("accessToken");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
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

            await axios.post(
                "http://localhost:3000/admin/add-movie",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Movie added successfully ✅");

            setForm({
                title: "",
                director: "",
                genre: "",
                releaseYear: "",
                rating: "",
                review: "",
                cast: "",
                status: "not completed",
            });
            setFile(null);

        } catch (error) {
            console.error(error);
            toast.error("Failed to add movie ❌");
        }

        setLoading(false);
    };

    return (
        <div className="movie-container">
            <h2>Add Movie 🎬</h2>

            <form onSubmit={handleSubmit} className="movie-form">

                <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                <input name="director" placeholder="Director" value={form.director} onChange={handleChange} required />
                <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} required />

                <input
                    name="releaseYear"
                    type="number"
                    placeholder="Release Year"
                    value={form.releaseYear}
                    onChange={handleChange}
                    required
                />

                <input
                    name="rating"
                    type="number"
                    placeholder="Rating (1-10)"
                    value={form.rating}
                    onChange={handleChange}
                    required
                />

                <input name="cast" placeholder="Cast" value={form.cast} onChange={handleChange} required />
                <input name="review" placeholder="Review" value={form.review} onChange={handleChange} required />

                <input type="file" onChange={handleFileChange} />

                <button type="submit">
                    {loading ? "Adding..." : "Add Movie"}
                </button>

            </form>
            <ToastContainer />
        </div>
    );
};

export default AddMovie;