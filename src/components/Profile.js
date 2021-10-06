import React from "react";

const Profile = ({token, user}) => {
    console.log(user);
    if(user.username){
        return (
            <div className="centered">
                <h1> Welcome: {user.username} </h1> 
                <h2> Messages to Me: </h2>
                {
                    user.messages.map((message, index) => {
                        if(message.fromUser._id !== user._id){
                            return(
                                <div key={index} className="card w-75 p-3 border-dark m-3 shadow bg-body rounded">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><h3>Post: {message.post.title}</h3></li>
                                        <li className="list-group-item">From: {message.fromUser.username}</li>
                                        <li className="list-group-item">Message: {message.content}</li>
                                    </ul>
                                </div>
                            )
                        }
                        return null;
                    })
                }
                <h2> Messages from Me: </h2>
                {
                    user.messages.map((message, index) => {
                        if(message.fromUser._id === user._id){
                            return(
                                <div key={index} className="card w-75 p-3 border-dark m-3 shadow bg-body rounded">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><h3>Post: {message.post.title}</h3></li>
                                        <li className="list-group-item">From: {message.fromUser.username}</li>
                                        <li className="list-group-item">Message: {message.content}</li>
                                    </ul>
                                </div>
                            )
                        }
                        return null;
                    })
                }
            </div>
        )
    }else{
        return (<div className="centered"><h1>Please Login to see your Profile</h1></div>);
    }
}

export default Profile;