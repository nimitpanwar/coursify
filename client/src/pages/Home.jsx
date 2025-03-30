import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col gap-6 p-10 px-3 max-w-6xl mx-auto pb-20">
        <h1 className="text-3xl font-bold lg:text-6xl pt-10">Welcome to Coursify</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          IIITD
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all courses
        </Link>
      </div>
    </div>
  );
}
