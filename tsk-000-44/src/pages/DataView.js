import React from "react";
import './DataView.css';

const DataView = ({ data, setEditUser, handleDelete }) => {
    const confirmDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this data?");
        if (confirm) {
            handleDelete(id);
        }
    };

    return (
        <div className="container mt-5">
            <h4>Data View</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => setEditUser(item)}>
                                    Edit
                                </button>{" "}
                                <button className="btn btn-danger" onClick={() => confirmDelete(item.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataView;
