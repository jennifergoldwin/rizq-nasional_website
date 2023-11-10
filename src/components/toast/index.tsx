import React from 'react';

interface ToastProps {
  message: string;
  success: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, success }) => (
  <div
  className='z-10 flex justify-center fixed bottom-[15px] w-full text-white right-0 left-0'
  >
    <div className={` w-fit py-2 px-3 rounded ${success ? 'bg-[#4CAF50]' : 'bg-[#F44336]'}`}>{message}</div>
    
  </div>
);

export default Toast;
