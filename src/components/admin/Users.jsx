import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getUsersAPI } from '../../services/allApiFile';
import styles from '../../Stylings/UsersPage.module.css'; // Correctly import as a module

function Users() {
    const [token, setToken] = useState();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setToken(sessionStorage.getItem('token')); 
    }, [setToken]); // Added dependency to useEffect for completeness

    useEffect(() => {
        const fetchUsers = async () => {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            const result = await getUsersAPI(reqHeader);
            const response = await result.data;
            setUsers(response);  
        };
        fetchUsers();
    }, [token]); // Ensured token is a dependency for useEffect

    return (
        <div className={styles['responsive-table']}> {/* Use styles object to reference class name */}
            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Users;
