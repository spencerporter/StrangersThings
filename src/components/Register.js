import React from "react";


const Register = () => {
    return(
        <form class="m-3 w-50">
            <div class="mb-3">
                <label for="usernameInput" class="form-label">Email address</label>
                <input type="text" class="form-control" id="usernameInput"/>
            </div>
            <div class="mb-3">
                <label for="passwordInput" class="form-label">Password</label>
                <input type="password" class="form-control" id="passwordInput"/>
            </div>
            <div class="mb-3">
                <label for="passwordInput" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="passwordInput"/>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default Register;