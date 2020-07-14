import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import Alert from "../layout/Alert";

const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        skills: "",
        headline: "",
        description: "",
        address: "",
        // city: "",
        // state: "",
        facebook: "",
        instagram: "",
        youtube: "",
        linkedin: ""
    });

    const { skills, headline, description, address, facebook, instagram, youtube, linkedin } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    }

    return (
        <div className="container">
            <Alert />

            <h2>Create Your Profile</h2>
            <p>
                Let's get some information to make your profile stand out
            </p>

            <small>* = required field</small>

            <form className="profile-form" onSubmit={ e => onSubmit(e) }>
                <div className="form-group">
                    <input className="form-control" type="text" name="skills" placeHolder="Skills" autoFocus value={ skills } onChange={ e => onChange(e) } />
                    <small>Please use comma separated values and be general (e.g. math tutor, cleaner, baby sitter, piano teacher)</small>
                </div>
                <div className="form-group">
                    <textarea className="form-control" rows="2" maxLength="80" type="text" name="headline" placeHolder="Headline" value={ headline } onChange={ e => onChange(e) } />
                    <small>
                        Keep it short and under 80 characters in 2 lines. You may include your desired pay rate here. 
                        (this appears in the search list rightaway)
                    </small>
                </div>
                <div className="form-group">
                    <textarea className="form-control" rows="4" type="text" name="description" placeHolder="Description..." value={ description } onChange={ e => onChange(e) } />
                    <small>
                        Further details you want customers to know.
                        {/* Tell us a little bit more about yourself. 
                        Describe your skills more specifically (eg. college math, jazz piano). 
                        Price can be included here too */}
                    </small>
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" name="address" placeHolder="*Street Address" value={ address } onChange={ e => onChange(e) } />
                    <small>
                        Completeness is important for Google Maps purposes (e.g. 27 E Cota St Ste 500, Santa Barbara, CA 93101)
                    </small>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fab fa-facebook-square fa-2x facebook"></i>
                        </span>
                    </div>
                    <input type="text" name="facebook" className="form-control rounded col-11 ml-auto" placeholder="Facebook URL" value={ facebook } onChange={ e => onChange(e) } />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fab fa-instagram fa-2x instagram"></i>
                        </span>
                    </div>
                    <input type="text" name="instagram" className="form-control rounded col-11 ml-auto" placeholder="Instagram URL" value={ instagram } onChange={ e => onChange(e) } />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fab fa-youtube fa-2x youtube"></i>
                        </span>
                    </div>
                    <input type="text" name="youtube" className="form-control rounded col-11 ml-auto" placeholder="YouTube URL" value={ youtube } onChange={ e => onChange(e) } />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fab fa-linkedin fa-2x linked-in"></i>
                        </span>
                    </div>
                    <input type="text" name="linkedin" className="form-control rounded col-11 ml-auto" placeholder="LinkedIn URL" value={ linkedin } onChange={ e => onChange(e) } />
                </div>
                
                <Link type="button" className="btn btn-dark buttons" to="/dashboard">
                    <i class="fas fa-arrow-left"></i>{" "}Back
                </Link>
                <button className="btn btn-primary buttons" type="submit">Save</button>
            </form>
        </div>
    );
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
