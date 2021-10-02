import React from "react";
import { useHistory } from "react-router";

const Home = ({token, user}) => {
    const history = useHistory();

    if(token){
        return (
            <div className="centered">
                <h1> Welcome: {user.username} </h1>
                <h2> Logged in as {user.username}</h2>
                <button type="button" className="btn btn-outline-primary" onClick={(event) =>{
                    event.preventDefault();
                    history.push("/profile");
                }}>View Profile</button>
            </div>          
        )
    }else{
        return (<div className="centered">
            <h1>Welcome: Please Login to view Profile</h1>
            <button type="button" className="btn btn-outline-primary" onClick={(event) =>{
                    event.preventDefault();
                    history.push("/login");
                }}>Log In</button>
        </div>)
    }
}

export default Home;