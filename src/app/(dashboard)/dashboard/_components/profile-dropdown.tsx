"use client"
import { useState } from 'react';
import { ChevronDown, User, LogOut, Settings } from 'lucide-react';
import Image from 'next/image';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 hover:bg-transparent p-1 rounded-lg transition-colors"
      >
        <div className="relative h-7 w-7">
          <Image 
            src="/images/pic1.jpg" 
            alt="profile" 
            className="object-cover rounded-full border border-gray-200"
            fill
            sizes="28px"
          />
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-gray-100 text-black rounded-lg shadow-lg border border-gray-200 py-1 z-20">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="font-medium">John Doe</div>
              <div className="text-sm text-gray-600">john.doe@example.com</div>
            </div>
            
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
              <User className="w-4 h-4" />
              View Profile
            </button>
            
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            
            <div className="border-t border-gray-100 my-1" />
            
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600">
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}