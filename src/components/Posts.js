import React, { useEffect, useState }from "react";
import { fetchPosts } from "../api";

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        try{
          Promise.all([fetchPosts()]).then(([posts]) => {
            setPosts(posts);
            console.log("setting posts ",posts)
          });
        }catch(error){
          console.error("There was an issue retriving Posts", error);
        }
      }, []);
 
    return (
        <div className="Posts">
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
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts;