import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, logOutUser } from '../redux/userSlice';
import Navbar from './Navbar';
import '../styles/user.css';

/* eslint-disable */
const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, name, picture, email } = JSON.parse(localStorage.getItem('user'));
    const updatedUser = useSelector((state) => state.user);
    const [user, setUser] = useState({
        id,
        name,
        picture,
    });

    const [updatedSuccessfully, setUpdatedSuccessfully] = useState(false);
    const [showPicture, setShowPicture] = useState(false);
    const [showName, setShowName] = useState(false);

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

    const handleShowPicture = () => {
        setShowPicture(!showPicture);
    };

    const handleShowName = () => {
        setShowName(!showName);
    };

    const handleLogoutClick = () => {
        dispatch(logOutUser());
        localStorage.clear();
        navigate('/');
    };

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (updatedUser.status === 'updated successfully') {
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUpdatedSuccessfully(true);
            setShowName(false);
            setShowPicture(false);
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
            <h2 className="heading">Manage Your Profile</h2>
            <div className="profile-container">
                <div className="profile-img">
                    <img src={user.picture} alt="profile" />
                    <button type="button" className="edit-btn" onClick={handleShowPicture}><FaRegEdit /></button>
                    {showPicture ? (
                        <form className="user-form">
                            <label htmlFor="picture">Please enter a valid image URL</label>
                            <input type="text" name='picture' value={user.picture} onChange={handleChange} />
                            <button type="submit" onClick={handleUpdateUser}>Upload</button>
                        </form>
                    ) : null}
                </div>
                <div className="profile">
                    <p className="para">
                        <span>Username: </span>
                        <span>{user.name}</span>
                        <button type="button" onClick={handleShowName}><FaRegEdit /></button>
                    </p>
                    {showName ? (
                        <form className="user-form">
                            <label htmlFor="name">Please enter your desired username</label>
                            <input type="text" name='name' value={user.name} onChange={handleChange} />
                            <button type="submit" onClick={handleUpdateUser}>Upload</button>
                        </form>
                    ) : null}
                </div>
                <p className="para">
                    <span>Email: </span>
                    <span className="email">{email}</span>
                </p>
                <div className="button_wrapper">
                    <button type="button" className="cancel_btn" onClick={handleBack}>
                        Back
                    </button>
                    <button type="button" onClick={handleLogoutClick} className="btn">
                        logout
                    </button>
              </div>
            </div>
        </div>
    );
};

export default User;
