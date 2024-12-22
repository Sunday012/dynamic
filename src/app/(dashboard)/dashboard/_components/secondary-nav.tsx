'use client'

import { useState } from 'react'
import { ChevronDown, BarChart2, Layout, Plus, RefreshCcw, Users, Trash2, MoreHorizontal, Brain, Filter, Columns, Share } from 'lucide-react'
import { BsMicrosoftTeams } from "react-icons/bs";

export default function SecondaryNav() {
  const [isLeadsOpen, setIsLeadsOpen] = useState(false)

  return (
    <div className="flex lg:flex-wrap items-center justify-between px-4 py-2 border-b bg-white">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsLeadsOpen(!isLeadsOpen)}
          className="flex items-center gap-2 font-bold px-3 py-1.5 text-sm hover:bg-gray-50 rounded-md"
        >
          My open leads
          <ChevronDown className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-gray-300 mx-2" />
      </div>

      <div className="flex lg:flex-wrap items-center space-x-2">
        <button className="hidden lg:flex items-center gap-1 px-2 py-1.5 text-sm font-medium hover:bg-gray-50 rounded-md">
          <BarChart2 className="w-4 h-4" />
          Show chart
        </button>

        <button className="hidden lg:flex items-center gap-1 px-2 py-1.5 text-sm font-medium hover:bg-gray-50 rounded-md">
          <Layout className="w-4 h-4" />
          Focused view
        </button>

        <button className="hidden lg:flex items-center gap-1 px-2 py-1.5 text-sm font-medium hover:bg-gray-50 rounded-md">
          <Plus className="w-4 h-4" />
          New
        </button>

        <button className="hidden lg:flex items-center gap-1 px-2 py-1.5 text-sm font-medium hover:bg-gray-50 rounded-md">
          <RefreshCcw className="w-4 h-4" />
          Refresh
        </button>

        <button className="hidden lg:flex items-center gap-1 px-2 py-1.5 text-sm font-medium hover:bg-gray-50 rounded-md">
          <BsMicrosoftTeams className='size-4 text-purple-800' />
          Collaborate
        </button>

        <button className="hidden lg:flex items-center gap-1 px-2 py-1.5 text-sm font-medium hover:bg-gray-50 rounded-md">
          <Trash2 className="w-4 h-4" />
          Delete
        </button>

        <button className="p-1.5 hover:bg-gray-50 rounded-md">
          <MoreHorizontal className="w-4 h-4" />
        </button>

        <button className="hidden md:flex items-center gap-1 px-2 py-1.5 text-sm font-bold hover:bg-gray-50 rounded-md border border-gray-300">
          <Brain className="w-4 h-4" />
          Smart data
        </button>

        <button className="hidden md:flex items-center gap-1 px-2 py-1.5 text-sm font-bold hover:bg-gray-50 rounded-md border border-gray-300">
          <Filter className="w-4 h-4" />
          Edit filters
        </button>

        <button className="hidden md:flex items-center gap-1 px-2 py-1.5 text-sm font-bold hover:bg-gray-50 rounded-md border border-gray-300">
          <Columns className="w-4 h-4" />
          Edit columns
        </button>

        <div className="h-4 w-px bg-gray-300 mx-2" />

        <button className="p-1.5 hover:bg-gray-50 rounded-md bg-blue-600 text-white">
          <Share className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}