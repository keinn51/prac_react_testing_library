import React from "react";

const Profile = ({ username, name }) => {
    return (
        <div>
            <p>{username}</p>
            <span>({name})</span>
        </div>
    );
};

export default Profile;
