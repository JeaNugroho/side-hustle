import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";
// import profile from '../../reducers/profile';
import ProfileItem from './ProfileItem';
import { setAlert } from '../../actions/alert';
import Alert from "../layout/Alert";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    const [searchString, setSearchString] = useState("");

    const onChange = e => 
        setSearchString(e.target.value);

    const onSubmit = e => {
        e.preventDefault();
        getProfiles(searchString);
    }

    const searchForm = (
        <Fragment>
            <form onSubmit={ e => onSubmit(e) }>
                <div class="input-group md-form form-sm form-2 pl-0 search-form">
                    <input class="form-control search-bar my-0 py-1 red-border rounded shadow-sm" type="text" placeholder="Search" tabIndex="-1" value={ searchString } onChange={ e => onChange(e) } />
                    <div class="input-group-append search-button">
                        <span class="input-group-text red lighten-3" id="basic-text1">
                            <button className="btn btn-outline-dark search-button" type="submit">
                                <i class="fas fa-search text-grey"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </form>
            <Alert />
        </Fragment>
    );

    const emptySearch = (
        <div className="empty-search">
            <i class="fas fa-users fa-8x"></i>
            <h2>Search For Talents</h2>
        </div>
    );

    return (
        <div className="container">
            { searchForm }
            { profiles.length === 0 ? (emptySearch) : (
                loading ? <Spinner /> : (
                    <Fragment>
                        <p>{ profiles.length } search result{ profiles.length > 1 && "s" }</p>
                        <ul className="list-unstyled search-results">
                            { profiles.map(profile => (
                                <ProfileItem key={ profile._id } profile={ profile } />
                            )) }
                        </ul>                  
                    </Fragment>
                )
            ) }
        </div>
    );
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
