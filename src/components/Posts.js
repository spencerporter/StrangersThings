import React, { useEffect, useState }from "react";
import { Link } from "react-router-dom";

import { fetchPosts , fetchPostsWithToken , deletePostWithID, postMessage } from "../api";

async function getPosts(token, setPosts){
    if(token){
        const posts = await fetchPostsWithToken(token)
        setPosts(posts);
    }else{
        const posts = await fetchPosts();
        setPosts(posts);
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

const Posts = ({token, user}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts(token, setPosts);
    }, [token]);

    return (
        <div id="posts" className="centered">
            {(token !== "" ? <Link className="btn btn-outline-primary m-3" to="/posts/add">Add a Post</Link> : null)}
            {posts.map((post, index) => {
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
                                <button type="button" className="btn btn-outline-danger w-25 m-3" onClick={() => {deletePost(post._id,token,setPosts)}}>Delete</button>
                            :
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                const message = "Test Message" //TODO Get from Form
                                sendMessage(message,post._id,token, setPosts);
                            }}>
                                <div className="m-3">
                                    <label htmlFor="messageTextArea" className="form-label">Message the Author</label>
                                    <textarea className="form-control" id="messageTextArea" rows="3"></textarea>
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