import axios from "axios";
import { setAlert } from "./alert";

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get("/api/profile/me");

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({ type: CLEAR_PROFILE });

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get multiple profiles by skill
export const getProfiles = skill => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.get(`/api/profile/${skill}`);
        console.log(res.data[0]);

        if (res.data.length === 0) {
            dispatch(setAlert("No profiles found", "info", 2500));
        }

        // const filteredRes = (res.data).filter(profile => {
        //     return 
        // });

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get profile by id
export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${ userId }`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const res = await axios.post("/api/profile", formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

        // if (!edit) {
        history.push("/dashboard");
        // }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Rate a profile
export const rateProfile = (profileId, rating, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const rateData = {
            rate: rating
        };

        const res = await axios.put(`/api/profile/rate/${profileId}`, rateData, config);

        if (res.status === 400 || res.status === 403) {
            dispatch(setAlert(res.json.msg, "info", 4500));
        } else {
            dispatch(setAlert("Thank you, your rating is helpful for us!", "success", 4500));
        }

        history.push("/profiles");
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        history.push("/profiles");
    }
}

// Delete account & profile
export const deleteAccount = () => async dispatch => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
        try {
            await axios.delete("/api/profile");

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            dispatch(setAlert("Your account has been deleted successfully"));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
}