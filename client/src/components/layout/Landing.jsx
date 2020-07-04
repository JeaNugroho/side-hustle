import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {

    // const windowSize = useWindowSize();

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="jumbotron">
                    <h1>Be Your Own Boss.</h1>
                    <p>Quit your job and start Side Hustling</p>
                    <Link to="/register" type="button" className="btn btn-lg btn-primary buttons">Sign up</Link>
                    <Link to="/login" type="button" className="btn btn-lg btn-outline-light landing-btn">Log in</Link>
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);