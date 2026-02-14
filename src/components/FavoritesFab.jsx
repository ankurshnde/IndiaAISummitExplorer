import React from 'react';

const FavoritesFab = ({ isActive, onClick }) => {
    return (
        <button
            className={`fab-btn ${isActive ? 'active' : ''}`}
            onClick={onClick}
            title={isActive ? 'Show All Sessions' : 'Show Favorites'}
        >
            {isActive ? '★' : '☆'}
        </button>
    );
};

export default FavoritesFab;
