import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/AddPost.module.css'; // Import the CSS module

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('You need to be logged in to add a post.');
    } else {
      setAuthenticatedUser(user);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authenticatedUser) {
      alert('You are not authorized. Please log in.');
      return;
    }

    const response = await fetch('http://localhost:3001/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ title, content, user_id: authenticatedUser.id }),
    });

    if (response.status === 401) {
      alert('You are not authorized. Please log in.');
      router.push('/login');
      return;
    }

    const data = await response.json();
    if (data) {
      router.push('/posts');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add New Post</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
          required
        />
        <button type="submit" className={styles.submitButton}>Add Post</button>
      </form>
    </div>
  );
}
