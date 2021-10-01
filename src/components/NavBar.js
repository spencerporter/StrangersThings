import React, { useEffect } from "react";
import { BrowserRouter , Route , Link} from 'react-router-dom';

const NavBar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="d-flex justify-content-between p-3">
                <a className="navbar-brand fs-2" href="/">Stranger's Things</a>

                <div className="collapse navbar-collapse fs-3" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        <Link className="nav-link" to="/posts">Posts</Link>
                        <Link className="nav-link" to="/profile">Profile</Link>
                        {(!localStorage.getItem("token") ? <Link className="nav-link" to="/login">Log In</Link> : 
                        <Link className="nav-link" to="/login" onClick={(event) => {
                            localStorage.removeItem("token");
                        }}>Log Out</Link>)}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;