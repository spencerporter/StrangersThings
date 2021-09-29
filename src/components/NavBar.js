import React from "react";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="d-flex justify-content-between">
                <a className="navbar-brand" href="/">Stranger's Things</a>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                        <a className="nav-link" href="/posts">Posts</a>
                        <a className="nav-link" href="/profile">Profile</a>
                        <a className="nav-link disabled">Log Out</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;