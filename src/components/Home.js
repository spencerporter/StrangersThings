import React from "react";

const Home = ({user}) => {
    return (
        (user.username ? <h1> Welcome: {user.username} </h1> : null)
    )
}

export default Home;