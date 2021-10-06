import React, { useEffect, useState }from "react";
import { Link , useHistory } from "react-router-dom";

import { fetchPosts , fetchPostsWithToken , deletePostWithID, postMessage } from "../api";

async function getPosts(token, setPosts, setDisplayPosts){
    if(token){
        const posts = await fetchPostsWithToken(token)
        setPosts(posts);
        setDisplayPosts(posts);
    }else{
        const posts = await fetchPosts();
        setPosts(posts);
        setDisplayPosts(posts);
    }
}

async function deletePost(postID, token, setPosts){
    await deletePostWithID(token, postID)
    getPosts(token,setPosts);
}

async function sendMessage(message, postID, token, setPosts){
    await postMessage(message,postID,token);
    getPosts(token, setPosts);
}


function postMatches(post, text) {
    if(post.description.toLowerCase().includes(text)) return true;
    if(post.author.username.toLowerCase().includes(text)) return true;
    if(post.location.toLowerCase().includes(text)) return true;
    if(post.price.toLowerCase().includes(text)) return true;
    if(post.title.toLowerCase().includes(text)) return true;

    return false;
}

const Posts = ({token, user}) => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [displayPosts, setDisplayPosts] = useState([]);

    const history = useHistory();

    useEffect(() => {
        getPosts(token, setPosts, setDisplayPosts);
    }, [token]);

    return (
        <div id="posts" className="centered">
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search Posts" aria-label="Search"
                onChange={({target : {value}}) => {
                    const filteredPosts = posts.filter(post => postMatches(post, value.toLowerCase()));
                    const postsToDisplay = value.length ? filteredPosts : posts;
                    setDisplayPosts(postsToDisplay)
                }}/>
            </form>

            {(token !== "" ? <Link className="btn btn-outline-primary m-3" to="/posts/add">Add a Post</Link> : null)}
            
            {displayPosts.map((post, index) => {
                return (
                    <div key={index} className="card w-75 p-3 border-dark m-3 shadow bg-body rounded">
                        <div className="card-header bg-primary text-white">
                            {post.title}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Description: {post.description}</li>
                            <li className="list-group-item">Author: {post.author.username}</li>
                            <li className="list-group-item">Location: {post.location}</li>
                            <li className="list-group-item">Price: {post.price}</li>
                            {post.willDeliver ? <li className="list-group-item">Will Deliver</li> : <li className="list-group-item">Will NOT Deliver</li>}
                            {post.isAuthor ? 
                                <div className="horizGroup">
                                    <button type="button" className="btn btn-outline-danger w-25 m-3" onClick={() => {deletePost(post._id,token,setPosts)}}>Delete</button>
                                    <button type="button" className="btn btn-outline-primary w-25 m-3" 
                                    onClick={() => {history.push(`/posts/${post._id}`)}}>View Post</button>
                                </div>
                            :
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                const message = comments[post._id];
                                sendMessage(message,post._id,token, setPosts);
                            }}>
                                <div className="m-3">
                                    <label htmlFor="messageTextArea" className="form-label">Message the Author</label>
                                    <textarea className="form-control" id="messageTextArea" rows="3" onChange={({target : {value}}) => {
                                        let newComments = comments;
                                        newComments[post._id] = value;
                                        setComments(newComments);
                                    }}></textarea>
                                </div>
                                <button type="submit" className="btn btn-outline-primary w-25 m-3">Send Message</button>
                            </form>
                            }
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts;