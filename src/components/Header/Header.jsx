import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='fw-bold p-4 text-center'>
            <Link className='underline-none' to="/">Home</Link>
            <Link className='mx-5' to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    );
};

export default Header;