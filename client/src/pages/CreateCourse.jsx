import { Button, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreateCourse() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Add a Course</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Course Title' required id='title' className='flex-1'/>    
                <Select>
                    <option value="uncategorized"> Select course department</option>
                    <option value="mth"> MTH</option>
                    <option value="des"> DES</option>
                    <option value="cse"> CSE</option>
                    <option value="ssh"> SSH</option>
                    <option value="bio"> BIO</option>
                    <option value="ece"> ECE</option>
                    <option value="ent"> ENT</option>
                </Select>
            </div> 
            <ReactQuill theme="snow" placeholder='Add description...' className='h-72 mb-12' required/>
            <Button type='submit' gradientDuoTone='purpleToPink'>
                Add
            </Button>
        </form>
    </div>
  )
}
