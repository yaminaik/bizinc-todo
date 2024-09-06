import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Posts.module.css'; // Import CSS module
interface Post {
  id: number;
  title: string;
  content: string;
}
export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('http://localhost:3001/api/posts');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Blog Posts</h1>
      <div className={styles.button}>
        <button>
          <Link href="/add-post">+ Add Post</Link>
        </button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className={styles.listItem}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Posted by: <Link href={`/user/${post.user_id}`}>{post.username}</Link></p>
            <Link href={`/post/${post.id}`}>View Post & Comments</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
