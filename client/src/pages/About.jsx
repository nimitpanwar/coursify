export default function About() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-start p-10'>
      <div className='max-w-3xl w-full text-center'>
        <h1 className='text-4xl font-bold mb-6'>About Coursify</h1>
        <p className='text-md text-gray-700 mb-4 dark:text-gray-200'>
          Welcome to the ultimate platform for course reviews! Our mission is to help students make informed decisions about their courses by providing real feedback from their peers.
        </p>
        <p className='text-md text-gray-600 mb-4 dark:text-gray-200'>
          Choosing the right course is crucial for academic success. That’s why we’ve built a space where students can share their experiences and engage in meaningful discussions.
        </p>
        <p className='text-md text-gray-600 mb-4 dark:text-gray-200'>
          Whether you’re looking for insights on course difficulty, instructor quality, or workload, our platform provides transparent and honest reviews to guide you.
        </p>
        <p className='text-md text-gray-600 dark:text-gray-200'>
          Join our growing community, contribute your reviews, and help others navigate their academic journey with confidence!
        </p>
      </div>
    </div>
  );
}
