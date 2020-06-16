import React from 'react';
// import { url } from 'gravatar';

const Pictureside = (props) => {
    let { innerWidth, innerHeight } = window;

    let pictureUrl = "https://picsum.photos/id/" + props.picId + "/" + innerWidth + "/" + innerHeight;

    return (
        <img src={ pictureUrl } alt="Random Picture"></img>
    )
}

export default Pictureside;