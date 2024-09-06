import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.css'; // Import the CSS module for styling

const Navbar = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuthenticatedUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthenticatedUser(null);
    
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/posts">Posts</Link>
      {authenticatedUser ? (
        <>
          <span className={styles.username}>Welcome, {authenticatedUser.name}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
