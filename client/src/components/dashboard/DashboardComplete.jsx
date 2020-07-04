import React from 'react';
import { Link } from "react-router-dom";

export const DashboardComplete = () => {
    return (
        <div>
            <Link to="/edit-profile" className="btn btn-primary buttons">
                <i class="fas fa-user-edit"></i>{" "}Edit Profile
            </Link>
        </div>
    );
}

export default DashboardComplete;