import React, { useState, Fragment } from 'react';
// import Pictureside from "./Pictureside"

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2 } = formData;

    return (
        <Fragment>
            <div className="auth texture">
                <div className="card shadow p-3 mb-5 rounded">
                    <div className="card-header">
                        <h2>Sign Up</h2>
                        <p>Create your account</p>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <input type="text" name="name" className="form-control shadow-sm" placeHolder="Full Name" />
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" className="form-control shadow-sm" placeHolder="Email" />
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control shadow-sm" placeHolder="Password" minLength="6" />
                            </div>
                            <div className="form-group">
                                <input type="password" name="password2" className="form-control shadow-sm" placeHolder="Password" minLength="6" />
                                <small class="form-text text-muted">min. 6 characters</small>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block shadow-sm">Register</button>
                        </form>
                        <p>
                            <br />Already have an account?
                            <br /><a href="">Sign In</a>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Register;