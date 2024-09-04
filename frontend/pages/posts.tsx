import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';


const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/api/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);


    return (
        <Layout>
            <div>
            <h1>Blog Posts</h1>
            <p>Here you will find all our blog posts.</p>
          </div>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </Layout>
    );
};

export default Posts;
