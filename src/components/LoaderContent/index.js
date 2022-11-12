import React from 'react';
import './LoaderContent.css';

export default function LoaderContent() {
    return (
        <div style={{display: 'flex'}}>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            <div className="LoadingContent">Loading...</div>
        </div>
    )
}
