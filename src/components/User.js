import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/userSlice';

/* eslint-disable */
const User = () => {
    const dispatch = useDispatch();
    const userData = JSON.parse(localStorage.getItem('user'));
    const updatedUser = useSelector((state) => state.user);
    const [user, setUser] = useState({
        id: userData.id,
        name: userData.name,
        picture: userData.picture,
    });

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

    if (updatedUser.status === 'updated successfully') {
        console.log(updatedUser);
    }

    return (
        <form>
            <input type="text" placeholder="Enter your name" name='name' value={user.name} onChange={handleChange} />
            <input type="text" placeholder="picture" name='picture' value={user.picture} onChange={handleChange} />
            <button type="submit" onClick={handleUpdateUser}>Submit</button>
        </form>
    );
};

export default User;
