import { Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20 flex flex-col items-center'>
      <span className='mb-5 text-2xl font-bold'>Coursify</span>
      <div className='flex p-3 max-w-md w-full mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your username' />
              <TextInput type='text' placeholder='Username' id='username' />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput type='text' placeholder='name@iiitd.ac.in' id='email' />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput type='text' placeholder='Password' id='password' />
            </div>
            <button
              type='submit'
              className='border border-blue-500 text-blue-500 bg-white hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded'
            >
              Sign Up
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}