//rafce
import React from 'react';
import {Link } from 'react-router-dom';
const UserNav = () => {
    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className='nav-link' to="/user/history">
                        History
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link'to="/user/password">
                        password
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link'to="/user/wishlist">
                        wishlist
                    </Link>
                </li>
            </ul>
        </nav>
    )
};

export default UserNav;
