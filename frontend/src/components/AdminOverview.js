'use client'
import React, { useState, useEffect } from 'react'
import { Users, Activity, Target, TrendingUp, BarChart3, Globe } from 'lucide-react'

const AdminOverview = () => {
  const [dashboardData] = useState({
    totalUsers: 50000,
    newUsers: 100,
    activeUsers: 3318,
    totalProfiles: 3318,
    visitWebsite: 3671,
    downloadApp: 3671,
    socialEvents: 3671
  })
  
  const [timeFilter, setTimeFilter] = useState('daily')
  
  useEffect(() => {
    // Initialize component and load data
  }, [])
  
  return (
    <div className="bg-gray-100 rounded-2xl w-full p-8 max-w-7xl mx-auto min-h-screen">
      {/* Main Dashboard Header */}
      <div className="flex justify-center items-center gap-3 p-6 w-full mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Admin Overview Dashboard</h1>
      </div>
      
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-600">DC</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Devanshi Chitalia</h2>
            <p className="text-gray-600">Owner</p>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Admin Dashboard</h3>
        <p className="text-gray-600">User Management and Profile Analytics</p>
      </div>

      {/* Time Stats Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex space-x-16">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">1</div>
              <div className="text-lg">Days</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">1</div>
              <div className="text-lg">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                {dashboardData.totalUsers.toLocaleString().padStart(7, '0')}
              </div>
              <div className="text-lg">Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Period Filter */}
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
        <div className="flex gap-2 ml-8">
          {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((period) => (
            <button
              key={period}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeFilter === period.toLowerCase()
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setTimeFilter(period.toLowerCase())}
            >
              {period}
            </button>
          ))}
        </div>
        <span className="text-gray-500 ml-auto">Traffic Info and Data Analysis</span>
      </div>

      {/* Users and Feedback Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Users and their Feedbacks and Tickets</h2>
        
        {/* User Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">New Users</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{dashboardData.newUsers}</h3>
            <p className="text-sm text-green-500">+15.03%</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Active Users</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{dashboardData.activeUsers.toLocaleString()}</h3>
            <p className="text-sm text-green-500">+6.03%</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-purple-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Profiles</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{dashboardData.totalProfiles.toLocaleString()}</h3>
            <p className="text-sm text-green-500">+6.03%</p>
          </div>
        </div>
      </div>

      {/* Portfolio Types Section */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">User Create Portfolio Types</h3>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 mb-1">Total Portfolio Users</p>
            <h3 className="text-3xl font-bold text-gray-900">{dashboardData.totalUsers.toLocaleString()}</h3>
          </div>
          
          <div className="flex flex-col gap-3">
            {[
              { name: 'Personal', color: 'bg-blue-500', users: '12,450' },
              { name: 'Academic', color: 'bg-blue-400', users: '8,320' },
              { name: 'Corporate', color: 'bg-blue-600', users: '6,780' },
              { name: 'Business', color: 'bg-gray-400', users: '5,640' },
              { name: 'Professional', color: 'bg-gray-300', users: '4,210' }
            ].map((type) => (
              <div key={type.name} className="flex items-center gap-3 min-w-[200px]">
                <div className={`w-4 h-4 rounded ${type.color}`}></div>
                <span className="text-sm text-gray-600 flex-1">{type.name}</span>
                <span className="text-sm text-gray-900 font-medium">{type.users}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Location */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">Traffic Location</h3>
          </div>
          <button className="text-sm text-blue-500 hover:text-blue-600">View More Report</button>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { country: 'US', flag: '🇺🇸' },
            { country: 'Canada', flag: '🇨🇦' },
            { country: 'Japan', flag: '🇯🇵' },
            { country: 'Mexico', flag: '🇲🇽' },
            { country: 'Australia', flag: '🇦🇺' },
            { country: 'India', flag: '🇮🇳' }
          ].map((location) => (
            <div key={location.country} className="text-center">
              <div className="bg-gray-100 rounded-lg w-16 h-16 mx-auto mb-2 flex items-center justify-center text-2xl">
                {location.flag}
              </div>
              <p className="text-sm text-gray-600">{location.country}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Marketing Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Marketing - Daily | Weekly | Monthly | Yearly</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Visits Website</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{dashboardData.visitWebsite.toLocaleString()}</h3>
            <p className="text-sm text-red-500">-0.03%</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Download App</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{dashboardData.downloadApp.toLocaleString()}</h3>
            <p className="text-sm text-red-500">-0.03%</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Social Events</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{dashboardData.socialEvents.toLocaleString()}</h3>
            <p className="text-sm text-gray-500">Event Engagement</p>
          </div>
        </div>
      </div>

      {/* User Engagement Chart Placeholder */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
        <h3 className="text-xl font-semibold text-blue-500 mb-4">User Engagement</h3>
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Chart visualization will be here</p>
            <p className="text-sm text-gray-400">Jul-Jan 2024-2025 Year data</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-gray-500">2025, FindMe</p>
      </div>
    </div>
  )
}

export default AdminOverview