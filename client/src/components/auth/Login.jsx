import React, { useState, Fragment } from 'react';
// import Pictureside from "./Pictureside";
// import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Alert from "../layout/Alert";

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    }

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <div className="auth-container">
                <Alert />
                <div className="card shadow p-3 mb-5 rounded">
                    <div className="card-header">
                        <h2>Sign In</h2>
                        <p>Sign Into Your Account</p>
                    </div>
                    <div className="card-body">
                        <form onSubmit={ e => onSubmit(e) }>
                            <div className="form-group">
                                <input type="email" name="email" value={email} onChange={e => onChange(e)} className="form-control" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" value={password} onChange={e => onChange(e)} className="form-control" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block shadow-sm">Login</button>
                        </form>
                        <p className="info">
                            <br />Don't have an account?
                            <br /><Link to="/register">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);