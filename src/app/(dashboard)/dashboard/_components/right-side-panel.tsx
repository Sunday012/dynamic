import Image from 'next/image';
import React from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Example icons
import { IoCallOutline } from 'react-icons/io5';
import { PiChatLight, PiChats } from 'react-icons/pi';


export const RightSidePanel = () => {
  return (
    <div className="w-10 lg:w- bg-gray-100 border-l hidden lg:flex border-l-gray-300 flex-col gap-6 items-center">
      <Image src="/images/outline-copilot.svg" alt="copilot" className='size-5 mt-4' width={5} height={5} />
      <PiChats className="text-gray-600 text-xl hover:text-gray-800 cursor-pointer" />
      <IoCallOutline className="text-gray-600 text-xl hover:text-gray-800 cursor-pointer" />
      <PiChatLight className="text-gray-600 text-xl hover:text-gray-800 cursor-pointer" />
    </div>
  );
};