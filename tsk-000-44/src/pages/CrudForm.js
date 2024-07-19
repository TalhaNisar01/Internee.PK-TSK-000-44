import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Crud.css';

const CRUDForm = ({ fetchData, editUser, handleUpdate, handleAdd }) => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: ""
    });
    const [editID, setEditID] = useState(null);

    const { name, username, email } = formData;

    useEffect(() => {
        if (editUser) {
            setFormData(editUser);
            setEditID(editUser.id);
        }
    }, [editUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && username && email) {
            if (editID) {
                handleUpdate({ id: editID, ...formData });
            } else {
                handleAdd(formData);
            }
            setFormData({ name: "", username: "", email: "" });
            setEditID(null);
        } else {
            toast.error("Please fill all fields");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>{editID ? "Edit User" : "Add New User"}</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter name"
                                name="name"
                                value={name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary mr-2">
                                {editID ? "Update" : "Submit"}
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <Link to="/view" className="btn btn-secondary">View Data</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CRUDForm;
