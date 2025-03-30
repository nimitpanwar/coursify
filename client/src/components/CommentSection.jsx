import { Alert, Button, Modal, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [professor, setProfessor] = useState('');
  const [offering, setOffering] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 3000) {
      return;
    }

    const finalComment = `Professor: ${professor}\nOffering: ${offering}\n\n${comment}`;

    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: finalComment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setProfessor('');
        setOffering('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-4xl mx-auto w-full p-3'> {/* Wider comments section */}
      {currentUser && (
        <div className='max-w-2xl w-full mx-auto'> {/* Narrower form */}
          <form
            onSubmit={handleSubmit}
            className='border border-teal-500 rounded-md p-3'
          >
            {/* Professor Name Input */}
            <label className='block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-200'>Professor</label>
            <TextInput
              type='text'
              placeholder='Enter professor name'
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
              required
            />

            {/* Offering Input */}
            <label className='block text-gray-700 text-sm font-semibold mt-3 mb-1 dark:text-gray-200'>Offering</label>
            <TextInput
              type='text'
              placeholder='Enter offering (e.g., Winter 2025)'
              value={offering}
              onChange={(e) => setOffering(e.target.value)}
              required
            />

            {/* Comment Box */}
            <label className='block text-gray-700 text-sm font-semibold mt-3 mb-1 dark:text-gray-200'>Review</label>
            <Textarea
              placeholder='Add a review...'
              rows='3'
              maxLength='3000'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />

            <div className='flex justify-between items-center mt-5'>
              <p className='text-gray-500 text-xs'>
                {3000 - comment.length} characters remaining
              </p>
              <button className='border border-blue-500 text-blue-500 bg-white hover:bg-blue-500 hover:text-white 
                dark:border-white dark:text-white dark:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900 
                font-bold py-2 px-6 text-xs rounded-full'>
                Add
              </button>
            </div>

            {commentError && (
              <Alert color='failure' className='mt-5'>
                {commentError}
              </Alert>
            )}
          </form>
        </div>
      )}

      {comments.length === 0 ? (
        <p className='text-sm my-5'>No reviews yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Reviews</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}



      {/* Delete Confirmation Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this review?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
