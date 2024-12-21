import React from 'react'
import Header from './dashboard/_components/header'
import Sidebar from './dashboard/_components/sidebar'
import { RightSidePanel } from './dashboard/_components/right-side-panel'

export default function DasboardLayout(
    {children}:{
        children:React.ReactNode
    }
) {
  return (
    <div>
        <Header />
        <div className='flex flex-1 h-[calc(100vh-42px)]'>
        <Sidebar />
        {children}
        <RightSidePanel />
        </div>
    </div>
  )
}
