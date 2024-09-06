import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../../styles/PostComments.module.css'; 

export default function PostComments() {
  const router = useRouter();
  const { postId } = router.query;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  useEffect(() => {
    if (!router.isReady) return; // Ensure router is ready
    
    if (postId) {
      fetchComments(postId);
    }
  }, [router.isReady, postId]); // Ensure to re-run the effect only when router is ready and postId is available

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/comments/post/${postId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!newComment.trim()) return; // Don't allow empty comments

    try {
      const response = await fetch(`http://localhost:3001/api/comments/post/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment, // The new comment content
          user_id: 1, // Replace with actual user ID from your auth system
          post_id: postId, // Post ID
        }),
      });

      if (response.ok) {
        const addedComment = await response.json();
        setComments([...comments, addedComment]); // Update comments list with new comment
        setNewComment(''); // Clear the comment input
      } else {
        throw new Error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error.message);
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Comments for Post {postId}</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className={styles.commentItem}>
            <p className={styles.paragraph}>
              {comment.content} - Posted by User ID {comment.user_id}
            </p>
          </li>
        ))}
      </ul>

      {/* Form to add a new comment */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className={styles.textarea}
          placeholder="Add your comment"
          rows="4"
        />
        <button type="submit" className={styles.submitButton}>
          Submit Comment
        </button>
      </form>
    </div>
  );
}
