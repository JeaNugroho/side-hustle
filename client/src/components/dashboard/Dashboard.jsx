import React, { Fragment, useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import Alert from "../layout/Alert";
import DashboardComplete from "./DashboardComplete";
import ProfileDisplay from "./ProfileDisplay";

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {

    useEffect(() => {
        getCurrentProfile();
    }, []);

    return (
        loading && profile === null ? <Spinner /> : 
        
        <Fragment>
            <div className="container">
                <Alert />

                <h2>Dashboard</h2>
                <p>
                    <i className="fas fa-user" /> Welcome { user && user.name }<br />
                </p>
                { profile !== null ? (
                    <Fragment>
                        <ProfileDisplay profile={ profile } />
                        <DashboardComplete />
                    </Fragment>
                ) : (
                    <Fragment>
                        <p className="info">
                            You have not yet setup a profile.<br />
                            Please add some information.
                        </p>
                        <Link to="/create-profile" className="btn btn-primary">
                            Create Profile
                        </Link>
                    </Fragment>
                ) }
            </div>
        </Fragment>
    );
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
