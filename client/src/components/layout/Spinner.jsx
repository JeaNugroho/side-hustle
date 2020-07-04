import React, { Fragment } from "react";
import spinner from "../../img/spinner3.gif"

export default () => (
    <Fragment>
        <img
            className="spinner" 
            src={ spinner } 
            alt="Loading..." 
        />
    </Fragment>
);