import React, { useState, Fragment } from 'react';
import { connect } from "react-redux";
// import Pictureside from "./Pictureside";
// import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import Alert from "../layout/Alert";
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        if (password !== password2) {
            setAlert("Passwords do not match", "danger");
        } else {
            register({ name, email, password });
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <div className="auth-container">
                <Alert />
                <div className="card shadow p-3 mb-5 rounded">
                    <div className="card-header">
                        <h2>Sign Up</h2>
                        <p>Create Your Account</p>
                    </div>
                    <div className="card-body">
                        <form onSubmit={ e => onSubmit(e) }>
                            <div className="form-group">
                                <input type="text" name="name" value={name} onChange={e => onChange(e)} className="form-control" placeholder="Full Name" />
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" value={email} onChange={e => onChange(e)} className="form-control" placeholder="Email" />
                                <small className="form-text text-muted">Your picture will be picked out of this email's gravatar</small>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" value={password} onChange={e => onChange(e)} className="form-control" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <input type="password" name="password2" value={password2} onChange={e => onChange(e)} className="form-control" placeholder="Password" />
                                <small className="form-text text-muted">min. 12 characters</small>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block shadow-sm">Register</button>
                        </form>
                        <p className="info">
                            <br />Already have an account?
                            <br /><Link to="/login">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);