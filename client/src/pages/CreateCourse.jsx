import { Alert, Button, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateCourse() {
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('/api/post/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
            setPublishError(data.message);
            return;
          }
    
          if (res.ok) {
            setPublishError(null);
            navigate(`/post/${data.slug}`);
          }
        } catch (error) {
          setPublishError('Something went wrong');
        }
      };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Add a Course</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput 
                    type='text' 
                    placeholder='Course Title' 
                    required 
                    id='title' 
                    className='flex-1'
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <Select
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })} // Changed 'department' to 'category'
                >
                    <option value="uncategorized">Select course department</option>
                    <option value="maths">Maths</option>
                    <option value="design">Design</option>
                    <option value="cse">CSE</option>
                    <option value="ssh">SSH</option>
                    <option value="bio">BIO</option>
                    <option value="ece">ECE</option>
                    <option value="ent">ENT</option>
                </Select>
            </div> 
            <ReactQuill 
                theme="snow" 
                placeholder='Add description...' 
                className='h-72 mb-12' 
                required
                onChange={(value) => setFormData({ ...formData, content: value })}
            />
            <button type='submit'   className='border border-blue-500 text-blue-500 bg-white hover:bg-blue-500 hover:text-white 
             dark:border-white dark:text-white dark:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900 
             font-bold py-3 px-3 text-xs rounded-full'>
                Add
            </button>
            {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
        </form>
    </div>
  )
}