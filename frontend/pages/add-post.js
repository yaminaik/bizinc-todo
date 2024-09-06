import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // This ensures the session cookie is sent with the request
      body: JSON.stringify({ title, content }),
    });
    
    if (response.status === 401) {
      alert("You are not authorized. Please log in.");
      router.push('/login'); // Redirect to login if unauthorized
      return;
    }
  
    const data = await response.json();
    if (data) {
      router.push('/posts'); // Redirect to posts page after successfully adding a post
    }
  };
  

  return (
    <div>
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}
