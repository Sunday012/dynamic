import { Lightbulb, Plus, Settings, HelpCircle, Share2, User, Grip } from 'lucide-react'
import ProfileDropdown from './profile-dropdown'

export default function Header() {
  return (
    <header className="h-12 bg-[#0f1b38] text-gray-300 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <button className="p-1 hover:bg-white/10 rounded">
          <Grip className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium">Dynamics 365</span>
        <span className="text-sm text-gray-300">Sales hub</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="hidden lg:flex p-1 hover:bg-white/10 rounded">
          <Lightbulb className="w-5 h-5" />
        </button>
        <button className="hidden lg:flex p-1 hover:bg-white/10 rounded">
          <Plus className="w-5 h-5" />
        </button>
        <button className="hidden lg:flex p-1 hover:bg-white/10 rounded">
          <Settings className="w-5 h-5" />
        </button>
        <button className="p-1 hover:bg-white/10 rounded">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="p-1 hover:bg-white/10 rounded">
          <User className="w-5 h-5" />
        </button>
        <ProfileDropdown />
      </div>
    </header>
  )
}
