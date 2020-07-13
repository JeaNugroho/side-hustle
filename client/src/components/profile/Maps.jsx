import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
// import { getProfileById } from "../../actions/profile";
import { connect } from 'react-redux';

let wrapper_mk = "";

const Maps = ({ profile: { mk, profile }, match, google }) => {
    // useEffect(() => {
    //     getProfileById(match.params.id);
    // }, [getProfileById]);

    wrapper_mk = mk;
    
    return (
        <div className="maps-area">
            <Map google={ google } zoom={ 16 } initialCenter={ profile.geocode } >
                <Marker position={ profile.geocode } />
            </Map>
        </div>
    );
}

Maps.propTypes = {
    //getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

//, { getProfileById }
export default connect(mapStateToProps)
    (GoogleApiWrapper({
    apiKey: `${ wrapper_mk }`
})(Maps));