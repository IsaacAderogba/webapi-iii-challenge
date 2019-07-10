import React, { useState, useEffect } from "react";
import axios from "axios";

const User = props => {
  const [posts, setPosts] = useState([]);
  const { id } = props.match.params;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get(
      `http://localhost:4000/api/users/${id}/posts`
    );
    setPosts(response.data);
  };

  return (
    <div>
      {posts.slice(0, 1).map(post => (
        <h2 key={post.postedBy}>{post.postedBy}</h2>
      ))}
      {posts.map(post => (
        <p key={post.id}>{post.text}</p>
      ))}
    </div>
  );
};

export default User;
