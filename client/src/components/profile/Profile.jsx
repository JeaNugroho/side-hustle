import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileDisplay from "../dashboard/ProfileDisplay";
import Alert from "../layout/Alert";
import { getProfileById, rateProfile } from "../../actions/profile";


const Profile = ({ getProfileById, rateProfile, profile: { profile, loading }, auth, match, history }) => {
    let hasRated = false;
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById]);

    const [rateNumber, setRateNumber] = useState("");

    const changeRateNumber = e => setRateNumber(e.target.value);

    const onRate = e => {
        e.preventDefault();
        rateProfile(profile._id, rateNumber, history);
    }

    return (
        <div className="container">
            { profile === null || loading ? <Spinner /> : (
                <Fragment>
                    <Link type="button" to="/profiles" className="btn btn-dark buttons">
                        <i class="fas fa-arrow-left"></i>{" "}
                        Back
                    </Link>
                    {auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id &&
                    <Link to="/edit-profile" className="btn btn-primary buttons">
                        <i className="fas fa-user-edit"></i>{" "}Edit Profile
                    </Link>}
                    <Alert />
                    <div className="mt-4 mb-3 list-container rounded shadow" style={{ textAlign: "center" }}>
                        <img src={ profile.user.avatar } className="mr-3 rounded-circle list-picture d-inline-block" alt="profile pic" />
                        <h2 className="d-inline-block" style={{ transform: "translate(0, 15%)" }}>{ profile.user.name }</h2>
                    </div>
                    
                    
                    <ProfileDisplay profile={ profile } />

                    { auth.user._id !== profile.user._id && 
                    profile.rateroot.ratings.findIndex(userThatRated => userThatRated._id === auth.user._id) < 0 && 
                        <form className="text-center mt-5 container-sm rate-container rounded" onSubmit={ e => onRate(e) }>
                            <div className="form-group">
                                    <h3 className="d-inline-block mr-3 text-light">Rate:{" "}</h3>
                                    <input type="text" autoFocus="true" className="form-control mr-2 w-25 d-inline-block" min="1" max="5" placeholder="min: 1  |  max: 5" value={ rateNumber } onChange={ e => changeRateNumber(e) } />
                                    <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    }
                </Fragment>
            ) }
        </div>
    );
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    rateProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default 
    connect(mapStateToProps, { getProfileById, rateProfile })(withRouter(Profile));
