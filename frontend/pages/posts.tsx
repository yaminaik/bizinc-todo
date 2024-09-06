import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Posts.module.css'; // Import CSS module

// Define the Post interface with user_id and username if they exist in the API response
interface Post {
  id: number;
  title: string;
  content: string;
  user_id?: number;  // Optional field in case it is not always available
  username?: string; // Optional field in case it is not always available
}

export default function Posts() {
  // Explicitly type the posts state as an array of Post objects
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('http://localhost:3001/api/posts');
        const data: Post[] = await response.json();  // Cast the response as Post[]
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
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
            {/* Handle user_id and username only if they are present */}
            {post.user_id && post.username && (
              <p>Posted by: <Link href={`/user/${post.user_id}`}>{post.username}</Link></p>
            )}
            <Link href={`/post/${post.id}`}>View Post & Comments</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
