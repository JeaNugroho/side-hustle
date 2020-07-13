import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const ProfileItem = ({ profile: { user: { _id, name, avatar }, headline, rateroot: { sum, count, final } } }) => {
    return (
        <div>
            <li className="media list-container rounded shadow mb-4">
                <img src={ avatar } className="mr-4 rounded-circle list-picture" alt="profile pic" />
                <div className="media-body list-profile left-dashboard-display">
                    <Fragment>
                        <h3 className="mt-0 mb-2 w-75 d-inline-block">{ name }</h3>
                        <Link to={ `/profile/${ _id }` } className="btn btn-primary w-25">View</Link>
                    </Fragment>
                    
                    {/* <div className="w-25 h-25 d-inline-block list-rating text-right"> */}
                    <Fragment>
                        <p className="text-area d-inline-block list-desc w-75">{ headline }</p>
                        <div className="text-right">
                            <p className="d-inline-block">
                                rating:{" "}
                                { count === 0 ? "N/A" : (
                                <Fragment>
                                    { Math.round(final*10) / 10 }{" "}
                                    ({ count })
                                </Fragment>
                                ) }
                            </p>
                            
                        </div>
                    </Fragment>
                    {/* </div> */}
                </div>
            </li>
        </div>
    );
}

{/* <div class={ ratingColorFill }>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div> */}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;
