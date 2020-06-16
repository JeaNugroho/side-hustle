import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Landing = () => {

    // const windowSize = useWindowSize();

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="jumbotron">
                    <h1>Be Your Own Boss.</h1>
                    <p>Quit your job and start Side Hustling</p>
                    <Link to="/register" type="button" className="btn btn-lg btn-primary landing-btn">Sign up</Link>
                    <Link to="/login" type="button" className="btn btn-lg btn-outline-light landing-btn">Log in</Link>
                </div>
            </div>
        </section>
    )
}

export default Landing;