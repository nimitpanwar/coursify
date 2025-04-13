import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 dark:bg-neutral-900">
      <div className="w-full max-w-6xl px-4 pt-[20vh] text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-gray-900 dark:text-white">
          Welcome to <span className="text-[#3cacac]" >Coursify</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Find honest course reviews by students like you — make smarter choices for your college journey!
        </p>
        <div className="mt-8">
          <Link
            to="/search"
            className="inline-block border border-[#3cacac] text-white bg-[#3cacac] hover:bg-white hover:text-[#3cacac] hover:border--[#3cacac]
              dark:border-white dark:text-white dark:bg-transparent dark:hover:bg-white dark:hover:text-neutral-900 
              font-semibold py-3 px-6 text-sm rounded-full transition duration-300"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
