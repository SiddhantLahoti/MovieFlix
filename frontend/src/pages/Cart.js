import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const navigate = useNavigate();
    const total = items.reduce((acc, item) => acc + item.rentalPrice, 0);

    const removeItem = (id) => {
        const updated = items.filter(i => i._id !== id);
        setItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const checkout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/rentals', { movies: items, totalAmount: total }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Rentals confirmed!");
            localStorage.removeItem('cart');
            setItems([]);
            navigate('/rentals');
        } catch (err) { toast.error("Checkout failed. Check login."); }
    };

    return (
        <div className="container py-5">
            <h2 className="fw-bold mb-4">Your Cart</h2>
            {items.length === 0 ? <p>Cart is empty.</p> : (
                <div className="row">
                    <div className="col-md-8">
                        {items.map(item => (
                            <div key={item._id} className="card p-3 mb-2 d-flex flex-row justify-content-between align-items-center shadow-sm">
                                <span>{item.title}</span>
                                <div>
                                    <strong className="me-3">${item.rentalPrice}</strong>
                                    <button onClick={() => removeItem(item._id)} className="btn btn-sm btn-outline-danger">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <div className="card p-4 bg-dark text-white text-center shadow">
                            <h5>Total</h5>
                            <h2 className="text-primary fw-bold">${total}</h2>
                            <button onClick={checkout} className="btn btn-primary w-100 mt-3">Checkout Now</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Cart;