'use client'
import React, { useState, useEffect } from 'react'
import { Search, Download, Upload, RefreshCw, Users, Activity, Target, TrendingUp } from 'lucide-react'

const OverviewPage = () => {
  const [dashboardData] = useState({
    totalUsers: 50000,
    newUsers: 100,
    activeUsers: 3318,
    totalProfiles: 3318,
    visitWebsite: 3671,
    downloadApp: 3671
  })
  
  const [timeFilter, setTimeFilter] = useState('daily')
  
  useEffect(() => {
    // Initialize component and load data
  }, [])
  
  return (
    <div className="bg-gray-100 rounded-2xl w-full p-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex justify-center items-center gap-3 p-6 w-full mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Overview Dashboard</h1>
      </div>
      
      {/* Time Period Selector */}
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
      </div>

      {/* Stats Cards Row */}
      <div className="flex items-center gap-8 w-full mb-8">
        <div className="flex flex-col items-center bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-5xl font-bold text-gray-900 mb-2">1</h2>
          <h3 className="text-xl text-gray-600">Days</h3>
        </div>
        <div className="flex flex-col items-center bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-5xl font-bold text-gray-900 mb-2">1</h2>
          <h3 className="text-xl text-gray-600">Hours</h3>
        </div>
        <div className="flex flex-col items-center bg-white rounded-2xl p-6 shadow-sm flex-1">
          <h2 className="text-5xl font-bold text-gray-900 mb-2">
            {dashboardData.totalUsers.toLocaleString().padStart(7, '0')}
          </h2>
          <h3 className="text-xl text-gray-600">Total Users</h3>
        </div>
      </div>

      {/* Navigation Info */}
      <div className="flex justify-between items-center mb-8">
        <span className="text-blue-500 font-medium border-b-2 border-blue-500 pb-1">Overview</span>
        <span className="text-gray-500">Traffic Info and Data Analysis</span>
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
        <p className="text-lg font-semibold text-gray-900 mb-4">User Create Portfolio Types</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 mb-1">Total Portfolio Users</p>
            <h3 className="text-3xl font-bold text-gray-900">{dashboardData.totalUsers.toLocaleString()}</h3>
          </div>
          
          <div className="flex flex-col gap-3">
            {[
              { name: 'Personal', color: 'bg-blue-500' },
              { name: 'Academic', color: 'bg-blue-400' },
              { name: 'Corporate', color: 'bg-blue-600' },
              { name: 'Business', color: 'bg-gray-400' },
              { name: 'Matrimonial', color: 'bg-gray-500' },
              { name: 'Creative', color: 'bg-gray-600' },
              { name: 'Professional', color: 'bg-gray-300' }
            ].map((type) => (
              <div key={type.name} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded ${type.color}`}></div>
                <span className="text-sm text-gray-600">{type.name}</span>
                <span className="text-sm text-gray-900 ml-auto">Users</span>
              </div>
            ))}
          </div>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-1">3,671</h3>
            <p className="text-sm text-gray-500">Event Engagement</p>
          </div>
        </div>
      </div>

      {/* Traffic Location */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Traffic Location</h3>
          <button className="text-sm text-blue-500 hover:text-blue-600">View More Report</button>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {['US', 'Canada', 'Japan', 'Mexico', 'Australia', 'India'].map((country) => (
            <div key={country} className="text-center">
              <div className="bg-gray-100 rounded-lg w-16 h-16 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">{country}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OverviewPage