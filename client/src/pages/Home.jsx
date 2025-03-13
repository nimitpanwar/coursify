export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="text-center p-6 max-w-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to Course Reviews</h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover what students think about university courses. Make informed decisions before enrolling.
        </p>
        <a
          href="/courses"
          className="px-6 py-3 text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 transition-all"
        >
          View All Courses
        </a>
      </div>
    </div>
  );
}