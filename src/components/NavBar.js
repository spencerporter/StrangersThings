import React from "react";

const NavBar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="d-flex justify-content-between">
                <a class="navbar-brand" href="/">Stranger's Things</a>

                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                        <a class="nav-link" href="/posts">Posts</a>
                        <a class="nav-link" href="/profile">Profile</a>
                        <a class="nav-link disabled">Log Out</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;