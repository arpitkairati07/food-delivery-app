import React, { useContext, useEffect, useState } from 'react';
import "./MyOrders.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { url, token } = useContext(StoreContext);

    const fetchOrder = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data || []);
        } catch (err) {
            setError("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrder();
        }
    }, [token]);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.length > 0 ? data.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="Parcel Icon" />
                        <p>
                            {order.items?.map((item, idx) => 
                                `${item.name} x ${item.quantity}${idx === order.items.length - 1 ? "" : ", "}`
                            )}
                        </p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items?.length || 0}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button>Track your Order</button>
                    </div>
                )) : <p>No orders found.</p>}
            </div>
        </div>
    );
}

export default MyOrders;
