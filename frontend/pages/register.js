import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.css';
import Link from 'next/link';

export default function Register() {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.id) {
        alert('Registration successful');
        router.push('/login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Username:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>
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
        <button type="submit" className={styles.formButton}>Register</button>
        <p>Already have an account? <Link href="/login">Login here</Link></p>
      </form>
    </div>
  );
}
