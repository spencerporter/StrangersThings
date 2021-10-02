import React from "react";

const Profile = ({token, user}) => {
    if(user.username){
        return (
            <div className="centered">
                <h1> Welcome: {user.username} </h1> 
                <h2> Messages to Me: </h2>
                <h2> Messages from Me: </h2>
            </div>
        )
    }else{
        return (<div className="centered"><h1>Please Login to see your Profile</h1></div>);
    }
}

export default Profile;