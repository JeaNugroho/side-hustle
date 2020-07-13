import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import profile from '../../reducers/profile';

const ProfileDisplay = ({ profile: { skills, headline, description, address, social, user: { _id } } }) => {
    // const { skills, headline, description, address, social, _id } = profile;

    const displaySkills = skills.map(skill => (
        <span className="badge badge-light badges">{ skill }</span>
    ));

    return (
        <Fragment>
            { ((skills && skills[0] !== "") || headline || description) ? (<div className="left-half-dashboard">
                { skills && skills[0] !== "" && <h3>Skills</h3> }
                <dd><h3>{ displaySkills }</h3></dd>

                { headline && headline !== "" && <h3>Headline</h3> }
                <dd><p className="text-area">{ headline }</p></dd>

                { description && description !== "" && <h3>Description</h3> }
                <dd><p className="text-area">{ description }</p></dd>
            </div>) : null }

            <div className="right-half-dashboard">
                { address && 
                    <Fragment>
                        <h3 className="d-inline-block">
                            Address{" "}
                            <Link to={ `/profile/${ _id }/maps` } className="d-inline-block badge badge-primary">
                                <i class="fas fa-map-marked-alt"></i>{" "}Maps
                            </Link>
                        </h3>
                    </Fragment>
                }
                <dd><p>{ address }</p></dd>

                { social && (<h3>Social</h3>) }
                { social && social.facebook ? <dd><div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fab fa-facebook-square fa-2x facebook"></i>
                        </span>
                    </div>
                    <a href={ social.facebook }><p>{ social.facebook }</p></a>
                </div></dd> : null }
                { social && social.instagram ? <dd><div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fab fa-instagram fa-2x instagram"></i>
                        </span>
                    </div>
                    <a href={ social.instagram }><p>{ social.instagram }</p></a>
                </div></dd> : null }
                { social && social.youtube ? <dd><div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fab fa-youtube fa-2x youtube"></i>
                        </span>
                    </div>
                    <a href={ social.youtube }><p>{ social.youtube }</p></a>
               </div></dd> : null }
                { social && social.linkedin ? <dd><div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fab fa-linkedin fa-2x linked-in"></i>
                        </span>
                    </div>
                    <a href={ social.linkedin }><p>{ social.linkedin }</p></a>
                </div></dd> : null }
                {/* { profile.social.instagram && instagram }
                { profile.social.youtube && youtube }
                { profile.social.linkedin && linkedin } */}
            </div>
        </Fragment>
    )
}

ProfileDisplay.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileDisplay;
