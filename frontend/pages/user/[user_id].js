import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/UserPost.module.css'; 

export default function UserPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const { user_id } = router.query; // Extract user_id from the URL

  // Add this console log to check if the `user_id` is being passed correctly
  console.log("User ID:", user_id);

  useEffect(() => {
    if (user_id) {
      async function fetchUserPosts() {
        try {
          const response = await fetch(`http://localhost:3001/api/posts/user/${user_id}`);
          const data = await response.json();
          setUserPosts(data);

          // Assuming that data contains user information as well
          if (data.length > 0) {
            setUserName(data[0].username);
          }
        } catch (error) {
          console.error('Error fetching user posts:', error);
        }
      }
      fetchUserPosts();
    }
  }, [user_id]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Posts by {userName || 'User'}</h1>
      <ul>
        {userPosts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <h2 className={styles.heading}>{post.title}</h2>
            <p className={styles.paragraph}>{post.content}</p>
            <Link href={`/post/${post.id}`}>View Post & Comments</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}