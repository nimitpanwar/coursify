import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsInstagram, BsGithub } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-black-500'>
      <div className='w-full max-w-md mx-auto'>
        <div className='flex justify-between items-center'>
          <Link
            to='/'
            className='text-lg font-semibold dark:text-white'
          >
            Coursify
          </Link>
        </div>
        <Footer.Divider />
        <div className='flex justify-between items-center'>
          <Footer.Copyright
            href='#'
            by="Coursify"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-4">
            <Footer.Icon href='https://github.com/nimitpanwar' target='_blank' rel='noopener noreferrer' icon={BsGithub}/>
            <Footer.Icon href='https://instagram.com/nimitpanwar3' target='_blank' rel='noopener noreferrer' icon={BsInstagram}/>
          </div>
        </div>
        <div className='text-center mt-4'>
          <p>Made by Nimit Panwar</p>
        </div>
      </div>
    </Footer>
  );
}