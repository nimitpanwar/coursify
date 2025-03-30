import { Footer } from 'flowbite-react';

export default function FooterCom() {
  return (
    <Footer container className='text-center py-2 text-sm'>
      <p>&copy; {new Date().getFullYear()} Coursify</p>
    </Footer>
  );
}