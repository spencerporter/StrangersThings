/**
 * API Calls
 */
import { BASE_URL } from "../constants";


/**
 * Post Functions
 */
export async function fetchPosts() {
    try {
        const response = await fetch(`${BASE_URL}/posts`)
        const result = await response.json();
        const posts = result.data.posts;
        return posts;
    } catch (error) {
        console.error("Error retriving Posts", error);
    }
}

export async function fetchPostsWithToken(token) {
    try{
        const response = await fetch(`${BASE_URL}/posts`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        const posts = result.data.posts;
        return posts;
    }catch (error){
        console.error("Isssue Fetching Users Posts", error)
    }
}
export async function getPostWithID(token, postID, setPost){
    try{
        const response = await fetch(`${BASE_URL}/posts`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        const posts = result.data.posts;

        posts.forEach((post) => {
            if(post._id === postID) {
                setPost(post);
            }
        })
    }catch (error){
        console.error("Isssue Fetching Users Posts", error)
    }
}

export async function getPostWithIDForEdit(token, postID, setTitle, setDescription, setPrice, setLocation, setWillDeliver){
    try{
        const response = await fetch(`${BASE_URL}/posts`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        const posts = result.data.posts;

        posts.forEach((post) => {
            if(post._id === postID) {
                setTitle(post.title);
                setDescription(post.description);
                setPrice(post.price);
                setLocation(post.location);
                setWillDeliver(post.willDeliver);
            }
        })
    }catch (error){
        console.error("Isssue Fetching Users Posts", error)
    }
}

export async function postMessage(message, postID, token){
    fetch(`${BASE_URL}/posts/${postID}/messages`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            message: {
            content: message
        }
    })
    }).then(response => response.json())
    .catch(console.error);
}

export async function deletePostWithID (token, postID){
    try{
        const response = await fetch(`${BASE_URL}/posts/${postID}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    }catch (error){
        console.error("Isssue Fetching Users Posts", error)
    }
}

/**
 * User Functions
 */

export async function login(username, password){
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
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
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error retriving Posts", error);
    }
}

export async function register(username, password){
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
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
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error retriving Posts", error);
    }
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
        setUser(result.data)
        localStorage.setItem("user", result.data);
    })
    .catch(console.error);
}