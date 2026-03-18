import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import toast from 'react-hot-toast';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [genre, setGenre] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:5000/api/movies?genre=${genre}&page=${page}`);
            setMovies(data.movies);
            setTotalPages(data.pages);
        } catch (err) {
            toast.error("Failed to load movies");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMovies(); }, [genre, page]);

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1 className="fw-black display-5">Explore Movies</h1>
                    <p className="text-muted">Premium collection.</p>
                </div>
                <select className="form-select w-25" onChange={(e) => { setGenre(e.target.value); setPage(1); }}>
                    <option value="">All Genres</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Horror">Horror</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
            ) : (
                <>
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {movies.map(movie => <div className="col" key={movie._id}><MovieCard movie={movie} /></div>)}
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn btn-outline-dark me-2">Prev</button>
                        <span className="align-self-center">Page {page} of {totalPages}</span>
                        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="btn btn-outline-dark ms-2">Next</button>
                    </div>
                </>
            )}
        </div>
    );
};
export default Home;