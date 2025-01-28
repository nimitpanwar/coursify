import { Alert, Label, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('All fields are required');
    }
    try{
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch(error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen mt-20 flex flex-col items-center'>
      <span className='mb-5 text-2xl font-bold'>Coursify</span>
      <div className='flex p-3 max-w-md w-full mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your email' />
              <TextInput type='email' placeholder='name@iiitd.ac.in' id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
            </div>
            <button
              type='submit'
              className='border border-blue-500 text-blue-500 bg-white hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded'
              disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign Up'
              }
            </button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}