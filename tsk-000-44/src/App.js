import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CRUDForm from './pages/CrudForm';
import DataView from './pages/DataView';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [editUser, setEditUser] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            setData(res.data);
            toast.success("Data fetched successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (user) => {
        setEditUser(user);
        navigate('/');
    };

    const handleUpdate = (updatedUser) => {
        const updatedData = data.map(user => user.id === updatedUser.id ? updatedUser : user);
        setData(updatedData);
        setEditUser(null);
        navigate('/view');
        toast.success("Data updated successfully");
    };

    const handleDelete = (deleteID) => {
        const updatedData = data.filter(user => user.id !== deleteID);
        setData(updatedData);
        toast.success("Data deleted successfully");
    };

    const handleAdd = (newUser) => {
        const newData = [...data, { ...newUser, id: data.length + 1 }];
        setData(newData);
        toast.success("Data added successfully");
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            {loading ? <p>Loading...</p> : (
                <Routes>
                    <Route
                        path="/"
                        element={<CRUDForm fetchData={fetchData} editUser={editUser} handleUpdate={handleUpdate} handleAdd={handleAdd} />}
                    />
                    <Route
                        path="/view"
                        element={<DataView data={data} setEditUser={handleEdit} handleDelete={handleDelete} />}
                    />
                </Routes>
            )}
        </div>
    );
};

export default App;
