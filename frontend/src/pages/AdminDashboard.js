import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [movies, setMovies] = useState([]);
    const [form, setForm] = useState({ title: '', genre: '', rentalPrice: '', stock: '', posterImage: '', description: '' });

    const fetchMovies = async () => {
        const { data } = await axios.get('http://localhost:5000/api/movies');
        setMovies(data);
    };

    useEffect(() => { fetchMovies(); }, []);

    const handleAdd = async (e) => {
        e.preventDefault();

        // Professional Manual Validation
        if (!form.title || !form.genre || form.rentalPrice <= 0 || form.stock < 0) {
            return toast.error("Please fill all fields with valid data");
        }

        try {
            await axios.post('http://localhost:5000/api/movies', form, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            toast.success("Movie Added!");
            fetchMovies();
            setForm({ title: '', genre: '', rentalPrice: '', stock: '', posterImage: '', description: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || "Error adding movie");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this movie?")) {
            await axios.delete(`http://localhost:5000/api/movies/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            toast.error("Movie Deleted");
            fetchMovies();
        }
    };

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Admin Dashboard</h1>
            <div className="card p-4 mb-5 border-0 shadow-sm bg-light">
                <h5>Add New Movie</h5>
                <form onSubmit={handleAdd} className="row g-3">
                    <div className="col-md-6"><input className="form-control" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
                    <div className="col-md-3"><input className="form-control" placeholder="Price" type="number" value={form.rentalPrice} onChange={e => setForm({ ...form, rentalPrice: e.target.value })} required /></div>
                    <div className="col-md-3"><input className="form-control" placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} required /></div>
                    <div className="col-12"><input className="form-control" placeholder="Poster URL" value={form.posterImage} onChange={e => setForm({ ...form, posterImage: e.target.value })} required /></div>
                    <div className="col-12"><button className="btn btn-success w-100">Save Movie</button></div>
                </form>
            </div>

            <table className="table table-hover">
                <thead className="table-dark">
                    <tr><th>Title</th><th>Price</th><th>Stock</th><th>Action</th></tr>
                </thead>
                <tbody>
                    {movies.map(m => (
                        <tr key={m._id}><td>{m.title}</td><td>${m.rentalPrice}</td><td>{m.stock}</td>
                            <td><button onClick={() => handleDelete(m._id)} className="btn btn-danger btn-sm">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default AdminDashboard;