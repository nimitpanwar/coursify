import { Alert, Modal, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [professor, setProfessor] = useState('');
  const [offering, setOffering] = useState('');
  const [review, setReview] = useState('');
  const [resources, setResources] = useState('');
  const [tips, setTips] = useState('');
  const [coursework, setCoursework] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!professor.trim()) {
      setCommentError('Professor name is required.');
      return;
    }

    let finalComment = '';

    if (professor.trim()) finalComment += `Professor: ${professor.trim()}\n`;
    if (offering.trim()) finalComment += `Offering: ${offering.trim()}\n\n`;
    if (review.trim()) finalComment += `Overall Review:\n${review.trim()}\n\n`;
    if (resources.trim()) finalComment += `Teaching Resources Feedback:\n${resources.trim()}\n\n`;
    if (tips.trim()) finalComment += `Tips for Success:\n${tips.trim()}\n\n`;
    if (coursework.trim()) finalComment += `Handling Coursework:\n${coursework.trim()}\n`;

    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: finalComment.trim(),
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setProfessor('');
        setOffering('');
        setReview('');
        setResources('');
        setTips('');
        setCoursework('');
        setCommentError(null);
        setComments([data, ...comments]);
        setShowModal(false);
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
    <div className='max-w-4xl mx-auto w-full p-3'>

      {/* Centered Add Review Button */}
      <div className='flex justify-center mb-8'>
        {currentUser ? (
          <button
            onClick={() => setShowModal(true)}
            className="inline-block border border-[#3cacac] text-white bg-[#3cacac] hover:bg-white hover:text-[#3cacac] hover:border-[#3cacac]
            dark:border-white dark:text-white dark:bg-transparent dark:hover:bg-white dark:hover:text-neutral-900 
            font-semibold py-3 px-6 text-sm rounded-full transition duration-300"
          >
            Add Review
          </button>
        ) : (
          <Link to='/sign-in'>
            <button
              className="inline-block border border-[#3cacac] text-white bg-[#3cacac] hover:bg-white hover:text-[#3cacac] hover:border-[#3cacac]
              dark:border-white dark:text-white dark:bg-transparent dark:hover:bg-white dark:hover:text-neutral-900 
              font-semibold py-3 px-6 text-sm rounded-full transition duration-300"
            >
              Sign In to Add Review
            </button>
          </Link>
        )}
      </div>

      {/* Comments */}
      {comments.length === 0 ? (
        <p className='text-sm my-5'>No reviews yet!</p>
      ) : (
        <div className='flex flex-col gap-6'>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size="4xl" popup>
  <Modal.Header>
    <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Add Your Review</h2>
  </Modal.Header>

        <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">

            {/* Professor Name */}
            <div>
              <label className='block mb-1 font-semibold'>Professor Name</label>
              <TextInput
                placeholder='Professor full name'
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                required
              />
            </div>

            {/* Course Offering */}
            <div>
              <label className='block mb-1 font-semibold'>Course Offering</label>
              <TextInput
                placeholder='Example: Winter 2025'
                value={offering}
                onChange={(e) => setOffering(e.target.value)}
              />
            </div>

            {/* Overall Review */}
            <div>
              <label className='block mb-1 font-semibold'>Your Overall Review</label>
              <Textarea
                placeholder='Please cover your experience, course structure, difficulty, grading, etc.'
                rows={5}
                maxLength={3000}
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>

            {/* Teaching Resources Feedback */}
            <div>
              <label className='block mb-1 font-semibold'>Teaching Resources Feedback</label>
              <Textarea
                placeholder='How would you rate the lecture slides, textbooks, online materials, etc.?'
                rows={3}
                value={resources}
                onChange={(e) => setResources(e.target.value)}
              />
            </div>

            {/* Tips for Success */}
            <div>
              <label className='block mb-1 font-semibold'>Tips for Success</label>
              <Textarea
                placeholder='What advice would you give to future students to do well in this course?'
                rows={3}
                value={tips}
                onChange={(e) => setTips(e.target.value)}
              />
            </div>

            {/* Handling Coursework */}
            <div>
              <label className='block mb-1 font-semibold'>Handling Coursework</label>
              <Textarea
                placeholder='Feedback on handling quizzes, assignments, projects, exams, etc.'
                rows={3}
                value={coursework}
                onChange={(e) => setCoursework(e.target.value)}
              />
            </div>

            {commentError && (
              <Alert color='failure'>{commentError}</Alert>
            )}

            <div className='flex justify-end'>
              <button
                type='submit'
                className="inline-block border border-[#3cacac] text-white bg-[#3cacac] hover:bg-white hover:text-[#3cacac] hover:border-[#3cacac]
            dark:border-white dark:text-white dark:bg-transparent dark:hover:bg-white dark:hover:text-neutral-900 
            font-semibold py-3 px-6 text-sm rounded-full transition duration-300"
              >
                Submit Review
              </button>
            </div>

          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
