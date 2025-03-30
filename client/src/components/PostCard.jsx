import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post.slug}`} className='w-full h-[50px] flex items-center justify-between px-4 border border-gray-400 rounded-lg'>
      <p className='text-sm font-semibold truncate'>{post.title}</p>
      <span className='italic text-xs'>{post.category}</span>
    </Link>
  );
}