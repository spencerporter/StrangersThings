/**
 * API Calls
 */
export const BASE_URL = 'https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/';

export async function fetchPosts() {
    try {
        const response = await fetch(`${BASE_URL}/posts`)
        const data = await response.json();
        const posts = data.data.posts;
        console.log(posts);
        return posts;
    } catch (error) {
        console.error("Error retriving Posts", error);
    }
}

export async function login(username, password, setToken){
    fetch(`${BASE_URL}/users/login`, {
        method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            const token = result.data.token;
            setToken(token);
            localStorage.setItem("token", token);
        })
        .catch(console.error);
}

export async function register(username, password, setToken){
    fetch(`${BASE_URL}/users/register`, {
        method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                username: username,
                password: password
                }
            })
        })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        const token = result.data.token;
        setToken(token);
        localStorage.setItem("token", token);
    })
    .catch(console.error);
}

export async function getUser(token, setUser){
    fetch(`${BASE_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        setUser(result.data)
        localStorage.setItem("user", result.data);
    })
    .catch(console.error);
}
