import React from 'react';
import { Link } from "react-router-dom";

export const DashboardComplete = ({ deleteOnClick }) => {
    return (
        <div>
            <Link to="/edit-profile" className="btn btn-primary buttons">
                <i class="fas fa-user-edit"></i>{" "}Edit Profile
            </Link>
            <button className="btn btn-danger buttons" onClick={ () => deleteOnClick() }>
                <i className="fas fa-user-minus"></i>{" "}Delete My Account
            </button>
        </div>
    );
}

export default DashboardComplete;