'use client'
import { useState } from 'react'
import { Menu, X, BarChart3, Database, Settings, User } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    // <header className="bg-white shadow-sm border-b border-gray-200">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="flex justify-between items-center h-16">
    //       {/* Logo and Title */}
    //       <div className="flex items-center space-x-3">
    //         <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
    //           <BarChart3 className="w-5 h-5 text-white" />
    //         </div>
    //         {/* <div>
    //           <h1 className="text-xl font-bold text-gray-900">Data Dashboard</h1>
    //           <p className="text-xs text-gray-500">CSV Analytics Platform</p>
    //         </div> */}
    //       </div>

    //       {/* Desktop Navigation */}
    //       <nav className="hidden md:flex items-center space-x-8">
    //         <a href="" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
    //           Dashboard
    //         </a>
    //         <a href="/analytics" className="text-gray-600 hover:text-blue-600 transition-colors">
    //           Analytics
    //         </a>
    //         <a href="/data" className="text-gray-600 hover:text-blue-600 transition-colors">
    //           Data Management
    //         </a>
    //         <a href="/reports" className="text-gray-600 hover:text-blue-600 transition-colors">
    //           Reports
    //         </a>
    //       </nav>

    //       {/* User Menu */}
    //       <div className="hidden md:flex items-center space-x-4">
    //         <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
    //           <Database className="w-5 h-5" />
    //         </button>
    //         <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
    //           <Settings className="w-5 h-5" />
    //         </button>
    //         <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
    //           <User className="w-5 h-5" />
    //           <span className="text-sm">Admin</span>
    //         </button>
    //       </div>

    //       {/* Mobile menu button */}
    //       <div className="md:hidden">
    //         <button
    //           onClick={() => setIsMenuOpen(!isMenuOpen)}
    //           className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
    //         >
    //           {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    //         </button>
    //       </div>
    //     </div>

    //     {/* Mobile Navigation */}
    //     {isMenuOpen && (
    //       <div className="md:hidden border-t border-gray-200 py-4">
    //         <nav className="flex flex-col space-y-3">
    //           <a href="" className="text-blue-600 font-medium px-2 py-1">
    //             Dashboard
    //           </a>
    //           <a href="/analytics" className="text-gray-600 hover:text-blue-600 px-2 py-1 transition-colors">
    //             Analytics
    //           </a>
    //           <a href="/data" className="text-gray-600 hover:text-blue-600 px-2 py-1 transition-colors">
    //             Data Management
    //           </a>
    //           <a href="/reports" className="text-gray-600 hover:text-blue-600 px-2 py-1 transition-colors">
    //             Reports
    //           </a>
    //           <div className="border-t border-gray-200 pt-3 mt-3">
    //             <div className="flex items-center space-x-3 px-2">
    //               <User className="w-5 h-5 text-gray-600" />
    //               <span className="text-gray-600">Admin User</span>
    //             </div>
    //           </div>
    //         </nav>
    //       </div>
    //     )}
    //   </div>
    // </header>
    <header />
  )
}