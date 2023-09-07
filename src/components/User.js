import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import Navbar from './Navbar';

/* eslint-disable */
const User = () => {
    const dispatch = useDispatch();
    const { id, name, picture, email } = JSON.parse(localStorage.getItem('user'));
    const updatedUser = useSelector((state) => state.user);
    const [user, setUser] = useState({
        id,
        name,
        picture,
    });

    const [updatedSuccessfully, setUpdatedSuccessfully] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        dispatch(updateUser(user));
    };

    useEffect(() => {
        if (updatedUser.status === 'updated successfully') {
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUpdatedSuccessfully(true);
        }
    }, [updatedUser]);

    useEffect(() => {
        // If updated successfully, update the user state with the new data
        if (updatedSuccessfully) {
            setUser({
                id,
                name: updatedUser.name,
                picture: updatedUser.picture,
            });
        }
    }, [updatedSuccessfully, id, updatedUser]);

    return (
        <div className="page_container">
            <Navbar />
            <div className="profile-container">
                <img src={user.picture} alt="profile" className="profile-img" />
                <p className="profile-name">{user.name}</p>
                <p className="profile-email">{email}</p>
            </div>
            <form>
                <input type="text" placeholder="Enter your name" name='name' value={user.name} onChange={handleChange} />
                <input type="text" placeholder="picture" name='picture' value={user.picture} onChange={handleChange} />
                <button type="submit" onClick={handleUpdateUser}>Submit</button>
            </form>
        </div>
    );
};

export default User;
