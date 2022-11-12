import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

export default function PageNotFound( {role} ) {
    return (
        <div className='pageNotFound'>
            <h1>404</h1>
            <p>Page Not Found</p>
            {role === 'employee' ? <Link to='/employeeworksheet' style={{color: 'floralwhite'}}>Go Back to Home</Link> :
            <Link to='/clientmaster' style={{color: 'floralwhite'}}>Go Back to Home</Link>}
        </div>
    )
}
