import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.css';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/posts');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>
        <button type="submit" className={styles.formButton}>Login</button>
         {/* Link to the Register page */}
      <p>Don't have an account? <Link href="/register">Register here</Link></p>
      </form>
    </div>
  );
}
