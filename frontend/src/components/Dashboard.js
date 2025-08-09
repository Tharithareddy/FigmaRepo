'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BarChart, Bar, XAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, YAxis, CartesianGrid, AreaChart, Area } from 'recharts'
import { fetchCSVData } from '../store/slice/dataSlice'
import './Dashboard.css'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { csvData, loading, error } = useSelector(state => state.data)
  const [activeTab, setActiveTab] = useState('Daily')
  const [activePage, setActivePage] = useState('overview') // 'overview' or 'traffic'
  const [selectedUserType, setSelectedUserType] = useState('all-user-data')
  const [selectedSocialMediaType, setSelectedSocialMediaType] = useState('all-user-data')
  const [filteredData, setFilteredData] = useState([])
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalPortfolios: 0,
    verifiedUsers: 0,
    locationData: [],
    subscriptionData: []
  })

  useEffect(() => {
    // Load initial data
    dispatch(fetchCSVData())
  }, [dispatch])

  const filterDataByUserType = useCallback((data, userType) => {
    if (!data || data.length === 0) return []
    
    switch (userType) {
      case 'new-users':
        // Filter for users with recent creation or specific criteria for "new"
        // For demo purposes, let's consider users with Basic subscription as new users
        return data.filter(user => user.Subscription === 'Basic')
      
      case 'active-users':
        // Filter for active users (users with portfolios or verified accounts)
        return data.filter(user => {
          const portfolioCount = parseInt(user['No. Of Portfolios'] || '0')
          const isVerified = user['ID Verification'] === 'Verified' || user['Portfolio Verification'] === 'Verified'
          return portfolioCount > 0 || isVerified
        })
      
      case 'download-app-data':
        // Filter for users who likely downloaded the app (Premium/Advanced users)
        return data.filter(user => 
          user.Subscription === 'Premium' || user.Subscription === 'Advanced'
        )
      
      case 'all-user-data':
      default:
        return data
    }
  }, [])

  const processDataForDashboard = useCallback((data, userType = 'all-user-data') => {
    try {
      // Filter data based on selected user type
      const filteredUsers = filterDataByUserType(data, userType)
      
      // Take first 100 rows for display (increased from 5 for better analytics)
      const sampleData = filteredUsers.slice(0, 100)
      
      // Calculate metrics
      const totalUsers = sampleData.length
      const totalPortfolios = sampleData.reduce((sum, user) => {
        const portfolios = parseInt(user['No. Of Portfolios'] || user.portfolios || '0')
        return sum + (isNaN(portfolios) ? 0 : portfolios)
      }, 0)
      
      const verifiedUsers = sampleData.filter((user) => 
        user['ID Verification'] === 'Verified' || 
        user['Portfolio Verification'] === 'Verified' ||
        user.verified === true
      ).length

      // Process location data
      const locationData = sampleData.map((user) => {
        let country = 'Unknown'
        if (user.Location) {
          const locationParts = user.Location.split(', ')
          country = locationParts[locationParts.length - 1]
        } else if (user.country) {
          country = user.country
        }
        
        return { 
          country: country.length > 15 ? country.substring(0, 15) + '...' : country,
          users: 1,
          portfolios: parseInt(user['No. Of Portfolios'] || user.portfolios || '0') || 0
        }
      })

      // Group by country
      const countryStats = locationData.reduce((acc, user) => {
        if (!acc[user.country]) {
          acc[user.country] = { users: 0, portfolios: 0 }
        }
        acc[user.country].users += 1
        acc[user.country].portfolios += user.portfolios
        return acc
      }, {})

      const trafficData = Object.keys(countryStats).map(country => ({
        country,
        users: countryStats[country].users,
        portfolios: countryStats[country].portfolios
      }))

      // Process subscription data
      const subscriptionCounts = sampleData.reduce((acc, user) => {
        const subscription = user.Subscription || user.subscription || 'Basic'
        acc[subscription] = (acc[subscription] || 0) + 1
        return acc
      }, {})

      const subscriptionData = Object.keys(subscriptionCounts).map(sub => ({
        name: sub,
        users: subscriptionCounts[sub],
        color: getSubscriptionColor(sub)
      }))

      setDashboardData({
        totalUsers,
        totalPortfolios,
        verifiedUsers,
        locationData: trafficData,
        subscriptionData
      })

    } catch (error) {
      console.error('Error processing dashboard data:', error)
    }
  }, [filterDataByUserType])

  useEffect(() => {
    if (csvData && csvData.length > 0) {
      const filtered = filterDataByUserType(csvData, selectedUserType)
      setFilteredData(filtered)
      processDataForDashboard(csvData, selectedUserType)
    }
  }, [csvData, selectedUserType, filterDataByUserType, processDataForDashboard])

  const getSubscriptionColor = (subscription) => {
    const colors = {
      'Basic': '#EF4444',
      'Standard': '#F59E0B', 
      'Premium': '#3B82F6',
      'Advanced': '#10B981'
    }
    return colors[subscription] || '#6B7280'
  }

  const getChartDataByPeriod = (period) => {
    const baseData = {
      'Daily': [
        { period: 'Mon', newUsers: 120, activeUsers: 80, downloads: 45 },
        { period: 'Tue', newUsers: 150, activeUsers: 110, downloads: 60 },
        { period: 'Wed', newUsers: 200, activeUsers: 150, downloads: 90 },
        { period: 'Thu', newUsers: 180, activeUsers: 130, downloads: 75 },
        { period: 'Fri', newUsers: 220, activeUsers: 170, downloads: 105 },
        { period: 'Sat', newUsers: 160, activeUsers: 120, downloads: 85 },
        { period: 'Sun', newUsers: 140, activeUsers: 100, downloads: 70 }
      ],
      'Weekly': [
        { period: 'Week 1', newUsers: 450, activeUsers: 320, downloads: 180 },
        { period: 'Week 2', newUsers: 520, activeUsers: 380, downloads: 220 },
        { period: 'Week 3', newUsers: 600, activeUsers: 450, downloads: 280 },
        { period: 'Week 4', newUsers: 680, activeUsers: 520, downloads: 350 }
      ],
      'Monthly': [
        { period: 'Jul', newUsers: 1200, activeUsers: 800, downloads: 450 },
        { period: 'Aug', newUsers: 1450, activeUsers: 1000, downloads: 600 },
        { period: 'Sep', newUsers: 1600, activeUsers: 1200, downloads: 750 },
        { period: 'Oct', newUsers: 1800, activeUsers: 1400, downloads: 900 },
        { period: 'Nov', newUsers: 2000, activeUsers: 1600, downloads: 1050 },
        { period: 'Dec', newUsers: 2200, activeUsers: 1800, downloads: 1200 },
        { period: 'Jan', newUsers: 2400, activeUsers: 2000, downloads: 1350 }
      ],
      'Yearly and Till Date': [
        { period: '2022', newUsers: 8000, activeUsers: 6000, downloads: 3500 },
        { period: '2023', newUsers: 12000, activeUsers: 9500, downloads: 5800 },
        { period: '2024', newUsers: 18000, activeUsers: 14500, downloads: 9200 },
        { period: '2025', newUsers: 22000, activeUsers: 18000, downloads: 12500 }
      ]
    }

    let data = baseData[period] || baseData['Daily']
    
    // Adjust data based on selected user type to reflect real user metrics
    if (selectedUserType === 'new-users') {
      // Emphasize new users data, reduce others proportionally
      data = data.map(item => ({
        ...item,
        newUsers: Math.round(item.newUsers * 1.4), // Boost new users significantly
        activeUsers: Math.round(item.activeUsers * 0.6), // Reduce active users
        downloads: Math.round(item.downloads * 0.7) // Reduce downloads
      }))
    } else if (selectedUserType === 'active-users') {
      // Emphasize active users data
      data = data.map(item => ({
        ...item,
        newUsers: Math.round(item.newUsers * 0.5), // Reduce new users
        activeUsers: Math.round(item.activeUsers * 1.6), // Boost active users significantly
        downloads: Math.round(item.downloads * 1.2) // Slight boost in downloads for active users
      }))
    } else if (selectedUserType === 'download-app-data') {
      // Emphasize download data
      data = data.map(item => ({
        ...item,
        newUsers: Math.round(item.newUsers * 0.4), // Reduce new users
        activeUsers: Math.round(item.activeUsers * 0.8), // Slight reduction in active users
        downloads: Math.round(item.downloads * 2.2) // Significantly boost downloads
      }))
    }
    // For 'all-user-data', return original data without modification

    return data
  }

  // Helper function to get the maximum value from chart data for dynamic Y-axis scaling
  const getMaxValue = (data) => {
    const maxValues = data.map(item => 
      Math.max(item.newUsers || 0, item.activeUsers || 0, item.downloads || 0)
    )
    const overallMax = Math.max(...maxValues)
    return Math.ceil(overallMax * 1.1) // Add 10% padding
  }

  // Social Media Engagement chart data function
  const getSocialMediaChartDataByPeriod = (period) => {
    const baseData = {
      'Daily': [
        { period: 'Mon', instagramData: 85, linkedinData: 45, viewToWebsite: 120 },
        { period: 'Tue', instagramData: 110, linkedinData: 60, viewToWebsite: 150 },
        { period: 'Wed', instagramData: 150, linkedinData: 90, viewToWebsite: 200 },
        { period: 'Thu', instagramData: 130, linkedinData: 75, viewToWebsite: 180 },
        { period: 'Fri', instagramData: 170, linkedinData: 105, viewToWebsite: 220 },
        { period: 'Sat', instagramData: 120, linkedinData: 85, viewToWebsite: 160 },
        { period: 'Sun', instagramData: 100, linkedinData: 70, viewToWebsite: 140 }
      ],
      'Weekly': [
        { period: 'Week 1', instagramData: 320, linkedinData: 180, viewToWebsite: 450 },
        { period: 'Week 2', instagramData: 380, linkedinData: 220, viewToWebsite: 520 },
        { period: 'Week 3', instagramData: 450, linkedinData: 280, viewToWebsite: 600 },
        { period: 'Week 4', instagramData: 520, linkedinData: 350, viewToWebsite: 680 }
      ],
      'Monthly': [
        { period: 'Jul', instagramData: 800, linkedinData: 450, viewToWebsite: 1200 },
        { period: 'Aug', instagramData: 1000, linkedinData: 600, viewToWebsite: 1450 },
        { period: 'Sep', instagramData: 1200, linkedinData: 750, viewToWebsite: 1600 },
        { period: 'Oct', instagramData: 1400, linkedinData: 900, viewToWebsite: 1800 },
        { period: 'Nov', instagramData: 1600, linkedinData: 1050, viewToWebsite: 2000 },
        { period: 'Dec', instagramData: 1800, linkedinData: 1200, viewToWebsite: 2200 },
        { period: 'Jan', instagramData: 2000, linkedinData: 1350, viewToWebsite: 2400 }
      ],
      'Yearly and Till Date': [
        { period: '2022', instagramData: 6000, linkedinData: 3500, viewToWebsite: 8000 },
        { period: '2023', instagramData: 9500, linkedinData: 5800, viewToWebsite: 12000 },
        { period: '2024', instagramData: 14500, linkedinData: 9200, viewToWebsite: 18000 },
        { period: '2025', instagramData: 18000, linkedinData: 12500, viewToWebsite: 22000 }
      ]
    }

    let data = baseData[period] || baseData['Daily']
    
    // Adjust data based on selected social media type to reflect real social media metrics
    if (selectedSocialMediaType === 'instagram-data') {
      // Emphasize Instagram data, reduce others proportionally
      data = data.map(item => ({
        ...item,
        instagramData: Math.round(item.instagramData * 1.5), // Boost Instagram significantly
        linkedinData: Math.round(item.linkedinData * 0.6), // Reduce LinkedIn
        viewToWebsite: Math.round(item.viewToWebsite * 0.8) // Slight reduction in website visits
      }))
    } else if (selectedSocialMediaType === 'linkedin-data') {
      // Emphasize LinkedIn data
      data = data.map(item => ({
        ...item,
        instagramData: Math.round(item.instagramData * 0.7), // Reduce Instagram
        linkedinData: Math.round(item.linkedinData * 1.6), // Boost LinkedIn significantly
        viewToWebsite: Math.round(item.viewToWebsite * 0.9) // Slight reduction in website visits
      }))
    } else if (selectedSocialMediaType === 'view-to-website-data') {
      // Emphasize website visit data
      data = data.map(item => ({
        ...item,
        instagramData: Math.round(item.instagramData * 0.5), // Reduce Instagram
        linkedinData: Math.round(item.linkedinData * 0.7), // Reduce LinkedIn
        viewToWebsite: Math.round(item.viewToWebsite * 1.8) // Significantly boost website visits
      }))
    }
    // For 'all-user-data', return original data without modification

    return data
  }

  // Helper function to get the maximum value from social media chart data for dynamic Y-axis scaling
  const getSocialMediaMaxValue = (data) => {
    const maxValues = data.map(item => 
      Math.max(item.instagramData || 0, item.linkedinData || 0, item.viewToWebsite || 0)
    )
    const overallMax = Math.max(...maxValues)
    return Math.ceil(overallMax * 1.1) // Add 10% padding
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F0F9FF' }}>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F0F9FF' }}>
        <div className="text-center">
          <div className="text-red-600 text-2xl font-bold mb-2">Error Loading Data</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => dispatch(fetchCSVData())}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-max-width">
        {/* Header Card */}
        <div className="header-card">
          {/* Stars decoration Banner */}
          <div className="absolute inset-0">
            <div className="absolute top-8 left-20 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-16 left-40 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-12 right-60 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-20 right-40 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute bottom-16 left-32 w-1 h-1 bg-white rounded-full"></div>
          </div>
          
          <div className="flex justify-between items-center relative h-full">
            <div className="flex space-x-16 justify-center items-center w-full">
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">1</div>
                <div className="text-white text-lg">Days</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">1</div>
                <div className="text-white text-lg">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  {dashboardData.totalUsers.toString().padStart(7, '0')}
                </div>
                <div className="text-white text-lg">Users</div>
              </div>
            </div>
            {/* Rocket SVG */}
            <div className="rocket-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="163" height="140" viewBox="0 0 163 140" fill="none">
  <path d="M30.3211 133.65C33.8616 134.42 37.7177 133.56 40.6017 130.998C43.5278 128.397 44.758 124.666 44.2348 121.117C47.1819 122.53 50.8402 122.141 53.4142 119.854C55.7526 117.776 56.5704 114.688 55.8185 111.901C56.8327 111.777 57.8202 111.363 58.6324 110.641C60.2623 109.192 60.7028 106.956 59.9145 105.077C61.2821 104.328 62.337 103.106 62.8476 101.637C63.3694 101.769 63.9136 101.848 64.4789 101.848C68.0194 101.848 70.8908 99.0533 70.8908 95.6072C70.8908 95.1307 70.8305 94.6692 70.7267 94.2227C73.0075 93.7176 74.7091 91.7364 74.7091 89.3662C74.7091 88.177 74.2812 87.0874 73.5686 86.2314C74.5211 86.174 75.4651 85.8477 76.2759 85.236C77.7768 84.1028 78.4193 82.2937 78.1065 80.5911C78.7195 80.5652 79.3296 80.3617 79.8514 79.9685C81.1911 78.9568 81.4351 77.0781 80.3943 75.7742C79.3549 74.4703 77.4261 74.2327 76.0851 75.2444C75.5016 75.6868 75.1257 76.293 74.9742 76.9443C73.4256 76.3831 71.6258 76.5865 70.2245 77.6447C69.129 78.4721 68.4922 79.6613 68.3477 80.9038C65.9083 78.8448 62.2388 78.6769 59.5904 80.6758C57.008 82.6268 56.2435 86.0061 57.5453 88.7805C56.475 88.7177 55.3766 89.0153 54.4621 89.7062C53.4002 90.5076 52.8054 91.6723 52.7058 92.8806C51.8909 92.8628 51.0731 92.9926 50.2918 93.2752C49.307 93.383 48.3406 93.7462 47.5003 94.3797C46.2828 95.2986 45.5632 96.6121 45.3836 97.9897C42.1812 95.782 37.7514 95.756 34.4914 98.2205C31.0716 100.802 30.0588 105.275 31.7827 108.948C30.3646 108.866 28.9114 109.259 27.6994 110.174C26.3542 111.19 25.5687 112.648 25.3891 114.175C25.2839 114.262 25.1773 114.349 25.0749 114.442C24.8729 114.621 24.6807 114.807 24.4956 114.996C22.4574 114.592 20.2565 115.022 18.4835 116.362C17.6404 116.999 16.9826 117.78 16.507 118.642C13.3789 116.496 9.22266 115.913 5.43109 117.457C4.90021 117.672 4.395 117.922 3.91691 118.203C1.32954 119.719 0.511719 122.889 0.511719 125.888C0.511719 133.68 6.82816 139.996 14.6199 139.996H29.1204C30.5091 138.147 30.9201 135.8 30.3211 133.65Z" fill="#F7EEDC"/>
  <path d="M48.6517 135.712C48.8214 135.511 48.9883 135.305 49.1454 135.089C49.2268 134.978 49.304 134.867 49.3797 134.753C50.9087 134.398 52.2946 133.468 53.1657 132.051C53.9498 130.777 54.1742 129.331 53.9217 127.977C57.8578 129.196 62.2778 127.686 64.4913 124.087C66.6024 120.655 66.0469 116.396 63.421 113.579C64.7985 113.242 66.0455 112.392 66.8339 111.111C67.3767 110.227 67.6292 109.253 67.6208 108.294C67.8144 107.508 67.848 106.705 67.733 105.924C68.9478 105.684 70.0587 104.971 70.7461 103.854C71.338 102.891 71.5077 101.799 71.317 100.775C74.2894 101.697 77.6293 100.557 79.3013 97.8383C81.0154 95.0503 80.4039 91.54 78.022 89.4401C79.2662 89.1533 80.3968 88.3983 81.1066 87.2446C82.0128 85.77 82.0044 84.0142 81.2497 82.5915C81.8921 82.3676 82.4631 81.9334 82.8418 81.3176C83.7087 79.9072 83.2374 78.0804 81.7883 77.2352C80.3393 76.3914 78.4611 76.8502 77.5942 78.2606C77.2575 78.8095 77.1243 79.4212 77.172 80.0151C75.4045 79.9168 73.6441 80.751 72.6734 82.3307C72.1488 83.1854 71.9314 84.133 71.9861 85.0559C71.0308 84.4729 69.8736 84.1903 68.6672 84.3323C66.2587 84.6163 64.4506 86.4923 64.2122 88.7465C63.7464 88.6987 63.2709 88.6973 62.787 88.7547C59.2872 89.167 56.7931 92.2636 57.2167 95.6701C57.2841 96.2135 57.4286 96.7283 57.6277 97.2143C56.197 97.882 55.0804 99.0425 54.4842 100.449C52.4811 99.9136 50.262 100.607 48.9869 102.348C48.3515 103.216 48.0485 104.216 48.0443 105.206C45.1238 104.815 42.0855 105.973 40.2564 108.472C38.242 111.221 38.2841 114.788 40.0726 117.454C36.4059 117.376 32.7644 119.007 30.4737 122.133C28.2181 125.214 27.8071 129.026 29.0121 132.341C26.2768 131.954 23.4236 133.027 21.7095 135.368C20.6813 136.77 20.2352 138.401 20.311 139.997H48.7302C49.1609 138.575 49.1188 137.078 48.6517 135.712Z" fill="#AFCED8"/>
  <path d="M162.106 123.857C162.106 121.196 161.068 118.46 158.604 117.457C154.812 115.913 150.656 116.496 147.526 118.642C147.052 117.78 146.394 116.999 145.55 116.362C143.778 115.022 141.577 114.592 139.539 114.996C139.354 114.807 139.162 114.621 138.96 114.442C138.856 114.349 138.751 114.262 138.646 114.175C138.466 112.648 137.68 111.19 136.334 110.174C135.123 109.259 133.67 108.866 132.251 108.948C133.976 105.275 132.963 100.802 129.543 98.2205C126.282 95.756 121.852 95.782 118.651 97.9897C118.47 96.6121 117.751 95.2986 116.534 94.3797C115.694 93.7462 114.728 93.383 113.743 93.2752C112.962 92.9926 112.142 92.8628 111.329 92.8806C111.229 91.6723 110.633 90.5076 109.573 89.7062C108.658 89.0153 107.56 88.7177 106.488 88.7805C107.791 86.0061 107.025 82.6268 104.443 80.6758C101.794 78.6769 98.1249 78.8448 95.6856 80.9038C95.5425 79.6613 94.9057 78.4721 93.8101 77.6447C92.4088 76.5865 90.6077 76.3831 89.0605 76.9443C88.9076 76.293 88.5331 75.6868 87.9481 75.2444C86.6085 74.2327 84.6798 74.4703 83.639 75.7742C82.5995 77.0781 82.8422 78.9568 84.1832 79.9685C84.7036 80.3617 85.3152 80.5652 85.9282 80.5911C85.6154 82.2937 86.2564 84.1028 87.7588 85.236C88.5695 85.8477 89.5136 86.174 90.4646 86.2314C89.7535 87.0874 89.3242 88.177 89.3242 89.3662C89.3242 91.7364 91.0271 93.7176 93.3066 94.2227C93.2028 94.6692 93.1438 95.1307 93.1438 95.6072C93.1438 99.0533 96.0138 101.848 99.5557 101.848C100.121 101.848 100.665 101.769 101.187 101.637C101.698 103.106 102.753 104.328 104.12 105.077C103.33 106.956 103.772 109.192 105.402 110.641C106.214 111.363 107.202 111.777 108.216 111.901C107.463 114.688 108.282 117.776 110.62 119.854C113.194 122.141 116.853 122.53 119.8 121.117C119.277 124.666 120.507 128.397 123.433 130.998C126.316 133.56 130.172 134.42 133.714 133.65C133.115 135.8 133.524 138.147 134.914 139.996H147.964C155.775 139.996 162.106 133.664 162.106 125.854V123.857Z" fill="#F7EEDC"/>
  <path d="M140.958 135.368C139.244 133.027 136.389 131.954 133.655 132.341C134.86 129.026 134.448 125.214 132.192 122.133C129.903 119.007 126.261 117.376 122.593 117.454C124.382 114.788 124.424 111.221 122.411 108.472C120.58 105.973 117.542 104.815 114.622 105.206C114.619 104.216 114.314 103.216 113.679 102.348C112.404 100.607 110.185 99.9136 108.183 100.449C107.587 99.0425 106.47 97.882 105.04 97.2143C105.237 96.7283 105.382 96.2135 105.451 95.6701C105.874 92.2636 103.38 89.167 99.8804 88.7547C99.3964 88.6973 98.9195 88.6987 98.4552 88.7465C98.2153 86.4923 96.4086 84.6163 94.0001 84.3323C92.7938 84.1903 91.6351 84.4729 90.6799 85.0559C90.736 84.133 90.5186 83.1854 89.9939 82.3307C89.0218 80.751 87.2614 79.9168 85.4954 80.0151C85.5417 79.4212 85.4098 78.8095 85.0732 78.2606C84.2049 76.8502 82.328 76.3914 80.879 77.2352C79.43 78.0804 78.9573 79.9072 79.8256 81.3176C80.2029 81.9334 80.7738 82.3676 81.4177 82.5915C80.663 84.0142 80.6532 85.77 81.5607 87.2446C82.2691 88.3983 83.3997 89.1533 84.6453 89.4401C82.2621 91.54 81.6519 95.0503 83.366 97.8383C85.0381 100.557 88.3766 101.697 91.3504 100.775C91.1582 101.799 91.3279 102.891 91.9213 103.854C92.6072 104.971 93.7196 105.684 94.9343 105.924C94.8179 106.705 94.8516 107.508 95.0452 108.294C95.0381 109.253 95.2906 110.227 95.8335 111.111C96.6218 112.392 97.8674 113.242 99.2463 113.579C96.6204 116.396 96.0649 120.655 98.176 124.087C100.388 127.686 104.81 129.196 108.746 127.977C108.492 129.331 108.718 130.777 109.502 132.051C110.373 133.468 111.759 134.398 113.288 134.753C113.363 134.867 113.441 134.978 113.52 135.089C113.679 135.305 113.845 135.511 114.016 135.712C113.547 137.078 113.505 138.575 113.936 139.997H142.356C142.432 138.401 141.985 136.77 140.958 135.368Z" fill="#AFCED8"/>
  <path d="M67.2189 133.43C67.7014 132.894 68.083 132.256 68.3144 131.53C68.7997 130.007 68.5388 128.432 67.7323 127.178C67.8178 127.006 67.8992 126.832 67.9735 126.651C68.0114 126.558 68.0465 126.466 68.0816 126.373C69.1083 125.862 69.9303 124.965 70.3007 123.809C70.6317 122.768 70.5363 121.699 70.1141 120.776C73.137 120.984 76.021 119.162 76.9594 116.224C77.8544 113.422 76.7013 110.479 74.3293 108.914C75.2509 108.44 75.9887 107.625 76.3226 106.579C76.554 105.857 76.561 105.121 76.3843 104.439C76.3829 103.846 76.2637 103.267 76.042 102.729C76.8654 102.354 77.5317 101.659 77.8235 100.747C78.0746 99.9602 78.0016 99.1532 77.6832 98.4556C79.9669 98.6126 82.1439 97.2377 82.8537 95.0176C83.5803 92.7416 82.5198 90.3427 80.4494 89.2463C81.2854 88.8312 81.9573 88.1035 82.2589 87.1614C82.6433 85.9572 82.3235 84.7065 81.5337 83.8204C81.9517 83.5514 82.2814 83.1473 82.4427 82.6448C82.8102 81.4925 82.1495 80.2691 80.9656 79.9114C79.7831 79.5537 78.5263 80.1968 78.1588 81.3478C78.0143 81.797 78.0297 82.2543 78.1686 82.6694C76.8921 82.8974 75.7853 83.789 75.3729 85.0779C75.1499 85.7756 75.1639 86.4869 75.3673 87.1355C74.5832 86.8815 73.7079 86.8747 72.8733 87.1792C71.2054 87.7881 70.2502 89.4292 70.4802 91.0759C70.1408 91.1209 69.7999 91.2001 69.466 91.3216C67.0435 92.205 65.8161 94.8319 66.7237 97.1899C66.8682 97.5667 67.0632 97.9094 67.2904 98.2221C66.3899 98.9389 65.8007 99.9533 65.624 101.057C64.102 101.013 62.6432 101.88 62.0442 103.337C61.744 104.062 61.7062 104.825 61.8787 105.532C59.7283 105.745 57.7673 107.082 56.9074 109.172C55.9592 111.471 56.6241 114.005 58.3719 115.607C55.7446 116.168 53.4371 117.943 52.3612 120.558C51.2993 123.134 51.6837 125.921 53.1313 128.081C51.1141 128.265 49.2696 129.512 48.463 131.468C47.8388 132.984 47.9692 134.607 48.6748 135.956C46.2214 136.156 43.9715 137.644 42.9629 139.996H70.8926C70.8281 137.282 69.3945 134.875 67.2189 133.43Z" fill="white"/>
  <path d="M113.944 135.956C114.648 134.607 114.779 132.984 114.155 131.468C113.348 129.512 111.505 128.265 109.486 128.081C110.934 125.921 111.318 123.134 110.256 120.558C109.181 117.943 106.873 116.168 104.246 115.607C105.994 114.005 106.658 111.471 105.712 109.172C104.85 107.082 102.889 105.745 100.737 105.532C100.911 104.825 100.874 104.062 100.573 103.337C99.9744 101.88 98.5156 101.013 96.9936 101.057C96.8169 99.9533 96.2277 98.9389 95.3272 98.2221C95.5544 97.9094 95.7494 97.5667 95.8939 97.1899C96.8014 94.8319 95.574 92.205 93.1515 91.3216C92.8177 91.2001 92.4768 91.1209 92.1374 91.0759C92.3674 89.4292 91.4121 87.7881 89.7443 87.1792C88.9097 86.8747 88.0344 86.8815 87.2503 87.1355C87.4536 86.4869 87.4663 85.7756 87.2446 85.0779C86.8322 83.789 85.7255 82.8974 84.4504 82.6694C84.5879 82.2543 84.6033 81.797 84.4588 81.3478C84.0913 80.1968 82.8345 79.5537 81.652 79.9114C80.4681 80.2691 79.8074 81.4925 80.1749 82.6448C80.3362 83.1473 80.6658 83.5514 81.0839 83.8204C80.2941 84.7065 79.9743 85.9572 80.36 87.1614C80.6602 88.1035 81.3321 88.8312 82.1682 89.2463C80.0963 90.3427 79.0373 92.7416 79.7639 95.0176C80.4737 97.2377 82.6507 98.6126 84.9343 98.4556C84.6159 99.1532 84.543 99.9602 84.7941 100.747C85.0858 101.659 85.7521 102.354 86.5755 102.729C86.3539 103.267 86.2347 103.846 86.2333 104.439C86.0565 105.121 86.0635 105.857 86.295 106.579C86.6288 107.625 87.3653 108.44 88.2883 108.914C85.9163 110.479 84.7632 113.422 85.6582 116.224C86.5966 119.162 89.4806 120.984 92.5035 120.776C92.0813 121.699 91.9845 122.768 92.3169 123.809C92.6872 124.965 93.5092 125.862 94.536 126.373C94.5711 126.466 94.6048 126.558 94.644 126.651C94.7184 126.832 94.7997 127.006 94.8853 127.178C94.0787 128.432 93.8178 130.007 94.3032 131.53C94.536 132.256 94.9162 132.894 95.3987 133.43C93.2231 134.875 91.7895 137.282 91.725 139.996H119.655C118.646 137.644 116.396 136.156 113.944 135.956Z" fill="white"/>
  <path d="M78.2606 56.0859C69.2102 58.661 69.9677 67.4347 70.3282 69.7121C70.3731 67.7719 70.735 64.7859 72.3425 62.5905C73.6316 60.8305 75.7147 59.5758 79.0826 59.7792L78.4065 56.7399L78.2606 56.0859Z" fill="#C62B0C"/>
  <path d="M84.3572 56.0859L84.2127 56.7399L83.5352 59.7792C86.9031 59.5758 88.9876 60.8305 90.2753 62.5905C91.8842 64.7859 92.2447 67.7719 92.291 69.7121C92.6515 67.4347 93.409 58.661 84.3572 56.0859Z" fill="#C62B0C"/>
  <path d="M71.976 45.9508C71.976 45.9508 67.974 48.3265 65.832 53.8425C68.2447 50.1779 72.6268 44.9173 76.4254 47.8323L76.4226 47.8118C75.9359 45.63 73.9356 44.793 71.976 45.9508Z" fill="#F79E0E"/>
  <path d="M76.4251 47.8384C72.6265 44.9234 68.2444 50.1841 65.8317 53.8487C64.4079 57.5174 63.8048 62.5733 65.756 69.2512C66.3423 71.2596 67.1461 73.4059 68.2416 75.7134C69.6752 75.7134 70.6417 73.8975 70.3906 71.6774C70.3906 71.6774 70.3008 70.8869 70.3288 69.7154C69.9683 67.438 69.2109 58.6643 78.2613 56.0892L78.1449 55.5622L76.4251 47.8384Z" fill="#FFDC0D"/>
  <path d="M90.6428 45.9509C88.8038 44.8641 86.9269 45.5345 86.3027 47.4255C90.062 45.4417 94.4512 50.5781 96.8625 54.0502C94.743 48.3881 90.6428 45.9509 90.6428 45.9509Z" fill="#F79E0E"/>
  <path d="M86.3044 47.4264C86.2637 47.5506 86.2273 47.6776 86.1978 47.8128L84.4753 55.557L84.3574 56.0841C93.4092 58.6591 92.6518 67.4328 92.2912 69.7102C92.3193 70.8817 92.2295 71.6722 92.2295 71.6722C91.9784 73.8923 92.9449 75.7082 94.3785 75.7082C95.474 73.4008 96.2764 71.2544 96.8641 69.246C98.7789 62.6924 98.2318 57.7034 96.8641 54.0511C94.4529 50.579 90.0637 45.4426 86.3044 47.4264Z" fill="#FFDC0D"/>
  <path d="M81.4481 13.5391C78.3439 13.5391 75.4964 14.5795 73.2296 16.3094C72.5633 21.2915 72.3444 27.8616 72.9266 36.5219C72.9939 37.5241 73.0725 38.5577 73.1636 39.6186H89.7327C89.8224 38.5577 89.9024 37.5241 89.9697 36.5219C90.5519 27.8616 90.3316 21.2915 89.6667 16.3094C87.3999 14.5795 84.551 13.5391 81.4481 13.5391Z" fill="#6699CC"/>
  <path d="M73.4292 42.4885H89.468C89.5634 41.5109 89.6531 40.5497 89.7331 39.6172H73.1641C73.2426 40.5497 73.3324 41.5109 73.4292 42.4885Z" fill="#FF6633"/>
  <path d="M73.497 43.1766C77.0501 44.8888 82.4703 45.4977 89.3815 43.35C89.4124 43.0565 89.439 42.7725 89.4685 42.4844H73.4297C73.4521 42.7151 73.4732 42.9431 73.497 43.1766Z" fill="#C62B0C"/>
  <path d="M74.3854 50.6727L88.4814 50.8884C88.8391 48.2383 89.1365 45.7315 89.3806 43.3531L73.4961 43.1797C73.7388 45.5445 74.0319 48.0376 74.3854 50.6727Z" fill="#E2DBD5"/>
  <path d="M74.3848 50.6743C74.9234 54.6953 75.6023 59.0507 76.4313 63.7475C76.4818 64.0342 76.5281 64.31 76.58 64.6008H86.315C86.3641 64.325 86.4076 64.0643 86.4566 63.7926C87.273 59.1627 87.9463 54.8632 88.4808 50.89C82.0198 48.132 77.0499 49.4387 74.3848 50.6743Z" fill="#6699CC"/>
  <path d="M87.0207 6.2769C85.3248 5.51094 83.4423 5.07812 81.4491 5.07812C79.4558 5.07812 77.5719 5.51094 75.876 6.2769C75.2462 7.62586 74.65 9.29568 74.1408 11.3724C73.7888 12.8155 73.4788 14.4499 73.2305 16.3081C75.4973 14.5782 78.3448 13.5378 81.4491 13.5378C84.5519 13.5378 87.4008 14.5782 89.6676 16.3081C89.4193 14.4499 89.1079 12.8155 88.7559 11.3724C88.2481 9.29568 87.6519 7.62586 87.0207 6.2769Z" fill="#F79E0E"/>
  <path d="M81.45 0.671875C81.45 0.671875 78.3977 0.873946 75.877 6.27662C77.5729 5.51066 79.4567 5.07785 81.45 5.07785C83.4433 5.07785 85.3257 5.51066 87.0216 6.27662C84.5023 0.873946 81.45 0.671875 81.45 0.671875Z" fill="#6699CC"/>
  <path d="M72.9609 34.8607C72.9609 37.4588 75.0671 39.565 77.6653 39.565C80.2634 39.565 82.3696 37.4588 82.3696 34.8607V18.1887C82.3696 15.5906 80.2634 13.4844 77.6653 13.4844C75.0671 13.4844 72.9609 15.5906 72.9609 18.1887V34.8607Z" fill="#8CB3D9"/>
  <path d="M81.4919 42.4885H73.9775C73.8793 41.5437 73.7853 40.5852 73.7012 39.6172H81.6308C81.5845 40.5839 81.5382 41.5437 81.4919 42.4885Z" fill="#FF8C48"/>
  <path d="M81.4537 43.264L74.0529 43.1834C74.0276 42.9513 74.0024 42.7179 73.9785 42.4844H81.4929C81.4789 42.7452 81.4663 43.0032 81.4537 43.264Z" fill="#D46011"/>
  <path d="M74.9701 50.4184C74.8775 49.8012 74.8032 49.2865 74.7527 48.9233C74.5072 47.0965 74.2674 45.1741 74.0527 43.1875L81.4535 43.2681C81.3483 45.3516 81.2403 47.3655 81.1351 49.2578C81.0734 49.2578 81.0117 49.2565 80.95 49.2565C78.4713 49.2565 76.4444 49.8122 74.9701 50.4184Z" fill="#E9E4E0"/>
  <path d="M80.2632 63.5612H77.0538C77.0538 63.5612 75.5977 54.599 74.9707 50.4197C76.445 49.8135 78.4719 49.2578 80.9505 49.2578C81.0123 49.2578 81.074 49.2592 81.1357 49.2592C80.677 57.5468 80.2632 63.5612 80.2632 63.5612Z" fill="#8CB3D9"/>
  <path d="M74.1113 15.691C74.4171 13.8914 74.8043 12.1452 75.2868 10.474C75.8156 8.64168 76.4441 7.07836 77.0949 5.7963C78.4584 5.33208 79.9228 5.07812 81.4504 5.07812C81.6384 5.07812 81.8263 5.08222 82.0129 5.09041C82.2303 7.20397 82.3327 10.1354 82.3524 13.5679C82.055 13.5487 81.7534 13.5378 81.4504 13.5378C78.7361 13.5378 76.2168 14.3338 74.1113 15.691Z" fill="#FFDC0D"/>
  <path d="M77.0938 5.79576C78.5301 2.96267 80.0717 1.49355 80.8811 1.49219C81.4142 1.49219 81.7789 2.82067 82.0117 5.08988C81.8252 5.08168 81.6372 5.07759 81.4492 5.07759C79.9217 5.07759 78.4572 5.33154 77.0938 5.79576Z" fill="#8CB3D9"/>
  <path d="M81.4349 44.7266C80.5231 44.7266 78.9492 45.4461 78.9492 46.3336L80.6171 74.1006C80.6171 74.9881 80.8261 75.709 81.4349 75.709C82.1545 75.709 82.2526 74.9881 82.2526 74.1006L83.9205 46.3336C83.9205 45.4461 82.3466 44.7266 81.4349 44.7266Z" fill="#FFDC0D"/>
  <path d="M81.7441 37.1366C81.7483 37.0588 81.7512 36.9755 81.7554 36.8977C83.1188 36.7489 84.1793 35.6224 84.1793 34.2557C84.1793 33.8052 84.0643 33.3806 83.8609 33.0078C84.1498 33.4297 84.3181 33.9376 84.3181 34.4824C84.3181 35.8996 83.1805 37.0574 81.7441 37.1366Z" fill="#3679C6"/>
  <path d="M81.5879 37.1424C80.5415 37.1424 79.6325 36.569 79.1738 35.7266C79.6634 36.4434 80.4994 36.9144 81.4491 36.9144C81.5529 36.9144 81.6553 36.909 81.7563 36.898C81.752 36.9759 81.7492 37.0591 81.745 37.137C81.6931 37.1411 81.6412 37.1424 81.5879 37.1424Z" fill="#4A9BD5"/>
  <path d="M81.4493 31.6016C79.9414 31.6016 78.7168 32.7908 78.7168 34.2599C78.7168 35.7276 79.9414 36.9182 81.4493 36.9182C82.9572 36.9182 84.1804 35.7276 84.1804 34.2599C84.1804 32.7908 82.9572 31.6016 81.4493 31.6016Z" fill="#F2AF19"/>
  <path d="M81.4499 32.3359C80.3628 32.3359 79.4805 33.1934 79.4805 34.2529C79.4805 35.311 80.3628 36.1685 81.4499 36.1685C82.537 36.1685 83.4193 35.311 83.4193 34.2529C83.4193 33.1934 82.537 32.3359 81.4499 32.3359Z" fill="#A1E0FF"/>
  <path d="M79.4805 34.257C79.4805 34.2556 79.4805 34.2543 79.4805 34.2529C79.4805 34.2543 79.4805 34.2556 79.4805 34.257ZM81.4639 32.3359C81.4639 32.3359 81.4639 32.3359 81.4625 32.3359C81.4639 32.3359 81.4639 32.3359 81.4639 32.3359ZM81.4569 32.3359C81.4569 32.3359 81.4569 32.3359 81.4555 32.3359C81.4569 32.3359 81.4569 32.3359 81.4569 32.3359Z" fill="#9B5933"/>
  <path d="M79.5787 34.8181C79.5211 34.6393 79.4805 34.4536 79.4805 34.257C79.4805 34.2556 79.4805 34.2542 79.4805 34.2529C79.4805 33.1934 80.3628 32.3359 81.4499 32.3359C81.4513 32.3359 81.4541 32.3359 81.4555 32.3359C81.4569 32.3359 81.4569 32.3359 81.4569 32.3359C81.4597 32.3359 81.4611 32.3359 81.4625 32.3359C81.4639 32.3359 81.4639 32.3359 81.4639 32.3359C82.0391 32.34 82.551 32.5885 82.9087 32.9763C82.7713 32.9667 82.638 32.9613 82.5104 32.9613C80.4792 32.9613 79.7961 34.1778 79.5787 34.8181Z" fill="#62C3FF"/>
  <path d="M80.5319 34.0547C80.3565 34.0547 80.2148 34.194 80.2148 34.3646C80.2148 34.5339 80.3565 34.6732 80.5319 34.6732C80.7058 34.6732 80.8489 34.5339 80.8489 34.3646C80.8489 34.194 80.7058 34.0547 80.5319 34.0547Z" fill="white"/>
  <path d="M82.0625 29.1572C82.0695 28.9797 82.0751 28.8035 82.0807 28.626C85.1527 28.3175 87.5458 25.7916 87.5458 22.7209C87.5458 21.731 87.2975 20.7971 86.857 19.9766C87.4868 20.9105 87.853 22.0287 87.853 23.2288C87.853 26.4073 85.2874 29.0015 82.0625 29.1572Z" fill="#3679C6"/>
  <path d="M81.7546 29.1674C79.4036 29.1674 77.3641 27.873 76.3457 25.9766C77.4356 27.5931 79.3139 28.6595 81.4488 28.6595C81.662 28.6595 81.8738 28.6485 82.0815 28.6281C82.0758 28.8056 82.0702 28.9817 82.0632 29.1592C81.9622 29.1646 81.8584 29.1674 81.7546 29.1674Z" fill="#4A9BD5"/>
  <path d="M81.4487 16.7812C78.0793 16.7812 75.3496 19.4382 75.3496 22.7164C75.3496 25.996 78.0793 28.6529 81.4487 28.6529C84.8166 28.6529 87.5463 25.996 87.5463 22.7164C87.5463 19.4382 84.8166 16.7812 81.4487 16.7812Z" fill="#F2AF19"/>
  <path d="M81.4489 18.4453C79.0208 18.4453 77.0527 20.3609 77.0527 22.7243C77.0527 25.0877 79.0208 27.0019 81.4489 27.0019C83.8756 27.0019 85.8436 25.0877 85.8436 22.7243C85.8436 20.3609 83.8756 18.4453 81.4489 18.4453Z" fill="#A1E0FF"/>
  <path d="M77.2702 23.9873C77.1425 23.5845 77.0527 23.1667 77.0527 22.7243C77.0527 20.3609 79.0208 18.4453 81.4489 18.4453C81.4503 18.4453 81.4531 18.4453 81.4559 18.4453H81.4573C81.4601 18.4453 81.4615 18.4453 81.4629 18.4453C81.4643 18.4453 81.4643 18.4453 81.4643 18.4453C81.4671 18.4453 81.4685 18.4453 81.4713 18.4453C82.7604 18.4521 83.9065 19.0092 84.706 19.8762C84.3974 19.853 84.1014 19.8421 83.8167 19.8421C79.2817 19.8421 77.7569 22.5591 77.2702 23.9873Z" fill="#62C3FF"/>
  <path d="M80.1712 20.3984C79.7055 20.3984 79.3281 20.7657 79.3281 21.219C79.3281 21.6709 79.7055 22.0382 80.1712 22.0382C80.6369 22.0382 81.0142 21.6709 81.0142 21.219C81.0142 20.7657 80.6369 20.3984 80.1712 20.3984Z" fill="white"/>
  <path d="M79.2029 22.6641C78.9181 22.6641 78.6895 22.888 78.6895 23.1651C78.6895 23.4409 78.9181 23.6649 79.2029 23.6649C79.4862 23.6649 79.7163 23.4409 79.7163 23.1651C79.7163 22.888 79.4862 22.6641 79.2029 22.6641Z" fill="white"/>
  <path d="M81.4499 12.0781C81.2395 12.0781 81.0684 12.242 81.0684 12.4481C81.0684 12.6529 81.2395 12.8195 81.4499 12.8195C81.6603 12.8195 81.83 12.6529 81.83 12.4481C81.83 12.242 81.6603 12.0781 81.4499 12.0781Z" fill="#CC8B96"/>
  <path d="M81.4484 12.1484C81.28 12.1484 81.1426 12.2822 81.1426 12.4461C81.1426 12.6113 81.28 12.7451 81.4484 12.7451C81.6181 12.7451 81.7542 12.6113 81.7542 12.4461C81.7542 12.2822 81.6181 12.1484 81.4484 12.1484Z" fill="#FFDC0D"/>
  <path d="M83.6809 12.2969C83.4705 12.2969 83.3008 12.4621 83.3008 12.6683C83.3008 12.8731 83.4705 13.0396 83.6809 13.0396C83.8913 13.0396 84.0625 12.8731 84.0625 12.6683C84.0625 12.4621 83.8913 12.2969 83.6809 12.2969Z" fill="#CC8B96"/>
  <path d="M83.6808 12.375C83.5125 12.375 83.375 12.5074 83.375 12.6726C83.375 12.8379 83.5125 12.9703 83.6808 12.9703C83.8519 12.9703 83.988 12.8379 83.988 12.6726C83.988 12.5074 83.8519 12.375 83.6808 12.375Z" fill="#FFDC0D"/>
  <path d="M85.8171 12.7578C85.6081 12.7578 85.4355 12.9244 85.4355 13.1292C85.4355 13.3354 85.6081 13.5006 85.8171 13.5006C86.0289 13.5006 86.1986 13.3354 86.1986 13.1292C86.1986 12.9244 86.0289 12.7578 85.8171 12.7578Z" fill="#CC8B96"/>
  <path d="M85.8175 12.8281C85.6492 12.8281 85.5117 12.9619 85.5117 13.1271C85.5117 13.2923 85.6492 13.4248 85.8175 13.4248C85.9886 13.4248 86.1233 13.2923 86.1233 13.1271C86.1233 12.9619 85.9886 12.8281 85.8175 12.8281Z" fill="#FFDC0D"/>
  <path d="M87.8073 13.5859C87.5969 13.5859 87.4258 13.7525 87.4258 13.9573C87.4258 14.1635 87.5969 14.3273 87.8073 14.3273C88.0177 14.3273 88.1875 14.1635 88.1875 13.9573C88.1875 13.7525 88.0177 13.5859 87.8073 13.5859Z" fill="#CC8B96"/>
  <path d="M87.8052 13.6562C87.6355 13.6562 87.498 13.7901 87.498 13.9553C87.498 14.1191 87.6355 14.2529 87.8052 14.2529C87.975 14.2529 88.111 14.1191 88.111 13.9553C88.111 13.7901 87.975 13.6562 87.8052 13.6562Z" fill="#FFDC0D"/>
  <path d="M79.1042 12.2969C78.8924 12.2969 78.7227 12.4621 78.7227 12.6683C78.7227 12.8731 78.8924 13.0396 79.1042 13.0396C79.3132 13.0396 79.4857 12.8731 79.4857 12.6683C79.4857 12.4621 79.3132 12.2969 79.1042 12.2969Z" fill="#CC8B96"/>
  <path d="M79.1021 12.375C78.931 12.375 78.7949 12.5074 78.7949 12.6726C78.7949 12.8379 78.931 12.9703 79.1021 12.9703C79.2704 12.9703 79.4079 12.8379 79.4079 12.6726C79.4079 12.5074 79.2704 12.375 79.1021 12.375Z" fill="#FFDC0D"/>
  <path d="M76.9675 12.7578C76.7557 12.7578 76.5859 12.9244 76.5859 13.1292C76.5859 13.3354 76.7557 13.5006 76.9675 13.5006C77.1765 13.5006 77.349 13.3354 77.349 13.1292C77.349 12.9244 77.1765 12.7578 76.9675 12.7578Z" fill="#CC8B96"/>
  <path d="M76.9674 12.8281C76.7962 12.8281 76.6602 12.9619 76.6602 13.1271C76.6602 13.2923 76.7962 13.4248 76.9674 13.4248C77.1357 13.4248 77.2731 13.2923 77.2731 13.1271C77.2731 12.9619 77.1357 12.8281 76.9674 12.8281Z" fill="#FFDC0D"/>
  <path d="M74.9778 13.5859C74.7674 13.5859 74.5977 13.7525 74.5977 13.9573C74.5977 14.1635 74.7674 14.3273 74.9778 14.3273C75.1882 14.3273 75.3593 14.1635 75.3593 13.9573C75.3593 13.7525 75.1882 13.5859 74.9778 13.5859Z" fill="#CC8B96"/>
  <path d="M74.9796 13.6562C74.8099 13.6562 74.6738 13.7901 74.6738 13.9553C74.6738 14.1191 74.8099 14.2529 74.9796 14.2529C75.1494 14.2529 75.2868 14.1191 75.2868 13.9553C75.2868 13.7901 75.1494 13.6562 74.9796 13.6562Z" fill="#FFDC0D"/>
  <path d="M74.3718 39.9531C74.1614 39.9531 73.9902 40.1183 73.9902 40.3245C73.9902 40.5293 74.1614 40.6959 74.3718 40.6959C74.5822 40.6959 74.7519 40.5293 74.7519 40.3245C74.7519 40.1183 74.5822 39.9531 74.3718 39.9531Z" fill="#CC8B96"/>
  <path d="M74.3716 40.0312C74.2033 40.0312 74.0645 40.1637 74.0645 40.3289C74.0645 40.4941 74.2033 40.6265 74.3716 40.6265C74.5414 40.6265 74.6774 40.4941 74.6774 40.3289C74.6774 40.1637 74.5414 40.0312 74.3716 40.0312Z" fill="#FFDC0D"/>
  <path d="M75.9401 39.9531C75.7297 39.9531 75.5586 40.1183 75.5586 40.3245C75.5586 40.5293 75.7297 40.6959 75.9401 40.6959C76.1505 40.6959 76.3203 40.5293 76.3203 40.3245C76.3203 40.1183 76.1505 39.9531 75.9401 39.9531Z" fill="#CC8B96"/>
  <path d="M75.94 40.0312C75.7703 40.0312 75.6328 40.1637 75.6328 40.3289C75.6328 40.4941 75.7703 40.6265 75.94 40.6265C76.1097 40.6265 76.2458 40.4941 76.2458 40.3289C76.2458 40.1637 76.1097 40.0312 75.94 40.0312Z" fill="#FFDC0D"/>
  <path d="M77.5071 39.9531C77.2967 39.9531 77.127 40.1183 77.127 40.3245C77.127 40.5293 77.2967 40.6959 77.5071 40.6959C77.7189 40.6959 77.8886 40.5293 77.8886 40.3245C77.8886 40.1183 77.7189 39.9531 77.5071 39.9531Z" fill="#CC8B96"/>
  <path d="M77.5089 40.0312C77.3406 40.0312 77.2031 40.1637 77.2031 40.3289C77.2031 40.4941 77.3406 40.6265 77.5089 40.6265C77.6801 40.6265 77.8161 40.4941 77.8161 40.3289C77.8161 40.1637 77.6801 40.0312 77.5089 40.0312Z" fill="#FFDC0D"/>
  <path d="M79.0749 39.9531C78.8645 39.9531 78.6934 40.1183 78.6934 40.3245C78.6934 40.5293 78.8645 40.6959 79.0749 40.6959C79.2853 40.6959 79.4564 40.5293 79.4564 40.3245C79.4564 40.1183 79.2853 39.9531 79.0749 39.9531Z" fill="#CC8B96"/>
  <path d="M79.0753 40.0312C78.907 40.0312 78.7695 40.1637 78.7695 40.3289C78.7695 40.4941 78.907 40.6265 79.0753 40.6265C79.2451 40.6265 79.3811 40.4941 79.3811 40.3289C79.3811 40.1637 79.2451 40.0312 79.0753 40.0312Z" fill="#FFDC0D"/>
  <path d="M80.6433 39.9531C80.4329 39.9531 80.2617 40.1183 80.2617 40.3245C80.2617 40.5293 80.4329 40.6959 80.6433 40.6959C80.8537 40.6959 81.0234 40.5293 81.0234 40.3245C81.0234 40.1183 80.8537 39.9531 80.6433 39.9531Z" fill="#CC8B96"/>
  <path d="M80.6456 40.0312C80.4759 40.0312 80.3398 40.1637 80.3398 40.3289C80.3398 40.4941 80.4759 40.6265 80.6456 40.6265C80.8154 40.6265 80.9514 40.4941 80.9514 40.3289C80.9514 40.1637 80.8154 40.0312 80.6456 40.0312Z" fill="#FFDC0D"/>
  <path d="M82.2116 39.9531C82.0026 39.9531 81.8301 40.1183 81.8301 40.3245C81.8301 40.5293 82.0026 40.6959 82.2116 40.6959C82.4234 40.6959 82.5932 40.5293 82.5932 40.3245C82.5932 40.1183 82.4234 39.9531 82.2116 39.9531Z" fill="#CC8B96"/>
  <path d="M82.2101 40.0312C82.0418 40.0312 81.9043 40.1637 81.9043 40.3289C81.9043 40.4941 82.0418 40.6265 82.2101 40.6265C82.3798 40.6265 82.5159 40.4941 82.5159 40.3289C82.5159 40.1637 82.3798 40.0312 82.2101 40.0312Z" fill="#FFDC0D"/>
  <path d="M83.778 39.9531C83.5676 39.9531 83.3965 40.1183 83.3965 40.3245C83.3965 40.5293 83.5676 40.6959 83.778 40.6959C83.9884 40.6959 84.1596 40.5293 84.1596 40.3245C84.1596 40.1183 83.9884 39.9531 83.778 39.9531Z" fill="#CC8B96"/>
  <path d="M83.7799 40.0312C83.6115 40.0312 83.4727 40.1637 83.4727 40.3289C83.4727 40.4941 83.6115 40.6265 83.7799 40.6265C83.9496 40.6265 84.0857 40.4941 84.0857 40.3289C84.0857 40.1637 83.9496 40.0312 83.7799 40.0312Z" fill="#FFDC0D"/>
  <path d="M85.3483 39.9531C85.1379 39.9531 84.9668 40.1183 84.9668 40.3245C84.9668 40.5293 85.1379 40.6959 85.3483 40.6959C85.5587 40.6959 85.7285 40.5293 85.7285 40.3245C85.7285 40.1183 85.5587 39.9531 85.3483 39.9531Z" fill="#CC8B96"/>
  <path d="M85.3482 40.0312C85.1785 40.0312 85.041 40.1637 85.041 40.3289C85.041 40.4941 85.1785 40.6265 85.3482 40.6265C85.5179 40.6265 85.654 40.4941 85.654 40.3289C85.654 40.1637 85.5179 40.0312 85.3482 40.0312Z" fill="#FFDC0D"/>
  <path d="M86.9133 39.9531C86.7029 39.9531 86.5332 40.1183 86.5332 40.3245C86.5332 40.5293 86.7029 40.6959 86.9133 40.6959C87.1252 40.6959 87.2949 40.5293 87.2949 40.3245C87.2949 40.1183 87.1252 39.9531 86.9133 39.9531Z" fill="#CC8B96"/>
  <path d="M86.9132 40.0312C86.7449 40.0312 86.6074 40.1637 86.6074 40.3289C86.6074 40.4941 86.7449 40.6265 86.9132 40.6265C87.0843 40.6265 87.2204 40.4941 87.2204 40.3289C87.2204 40.1637 87.0843 40.0312 86.9132 40.0312Z" fill="#FFDC0D"/>
  <path d="M88.4831 39.9531C88.2727 39.9531 88.1016 40.1183 88.1016 40.3245C88.1016 40.5293 88.2727 40.6959 88.4831 40.6959C88.6935 40.6959 88.8646 40.5293 88.8646 40.3245C88.8646 40.1183 88.6935 39.9531 88.4831 39.9531Z" fill="#CC8B96"/>
  <path d="M88.4835 40.0312C88.3152 40.0312 88.1777 40.1637 88.1777 40.3289C88.1777 40.4941 88.3152 40.6265 88.4835 40.6265C88.6533 40.6265 88.7893 40.4941 88.7893 40.3289C88.7893 40.1637 88.6533 40.0312 88.4835 40.0312Z" fill="#FFDC0D"/>
  <path d="M81.4508 45.1406C80.4717 45.1406 79.6777 45.8861 79.6777 46.4459C79.6777 47.0043 80.4717 52.7006 81.4508 52.7006C82.4299 52.7006 83.2224 47.0043 83.2224 46.4459C83.2224 45.8861 82.4299 45.1406 81.4508 45.1406Z" fill="#F79E0E"/>
</svg>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6">
          <div className="navigation-container">
            <span 
              className={`nav-link ${activePage === 'overview' ? 'nav-link-active' : ''}`}
              onClick={() => setActivePage('overview')}
            >
              Overview
            </span>
            <span 
              className={`nav-link nav-link-traffic ${activePage === 'traffic' ? 'nav-link-active' : ''}`}
              onClick={() => setActivePage('traffic')}
            >
              Traffic Info and Data Analysis
            </span>
          </div>
        </div>

        {/* Conditional Page Content */}
        {activePage === 'overview' ? (
          <>
            {/* Overview Title and Tabs */}
            <div className="overview-tabs-container">
              <div className="flex items-center border-b">
                <h1 className="overview-title">
                  Overview
                </h1>
                <div className="flex items-center space-x-2">
                  {['Daily', 'Weekly', 'Monthly', 'Yearly and Till Date'].map((tab, index) => (
                    <React.Fragment key={tab}>
                      <button
                        onClick={() => setActiveTab(tab)}
                        className={`tab-button ${activeTab === tab ? 'tab-button-active' : ''}`}
                      >
                        {tab}
                      </button>
                      {index < 3 && (
                        <span className="tab-separator">
                          |
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Users and their Feedbacks and Tickets Title */}
            <div className="section-title">
              <h2 className="section-title-text">
                Users and their Feedbacks and Tickets
              </h2>
            </div>

            {/* Summary Cards */}
              <div className="grid-cols-3 gap-8 mb-8">
                <div className="summary-card">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-600 text-sm">New Users</h4>
                  </div>
                  <div className="flex items-end space-x-2">
                    <span className="text-3xl font-bold text-gray-800">100</span>
                    <span className="text-green-500 text-sm font-medium">+16.03%</span>
                    <div className="w-4 h-4 mb-1">
                      <svg viewBox="0 0 16 16" className="w-full h-full">
                        <path d="M8 2L12 6H9V14H7V6H4L8 2Z" fill="#10B981"/>
                      </svg>
                    </div>
                    <div className="chart-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.122072 12.6277C-0.0371494 12.3204 -0.0423126 11.8118 0.11054 11.4918L2.79613 5.86787C2.87149 5.71005 2.97561 5.62084 3.08443 5.62084C3.19325 5.62084 3.29736 5.71005 3.37273 5.86787L5.00271 9.28121L6.93429 5.23628L5.55811 2.58036L9.99023 -0.00304508L8.88707 9.00499L7.51089 6.34906L5.291 10.9977C5.21564 11.1555 5.11153 11.2447 5.00271 11.2447C4.89389 11.2447 4.78977 11.1555 4.71441 10.9977L3.08443 7.58437L0.687133 12.6045C0.53428 12.9246 0.281294 12.935 0.122072 12.6277Z" fill="#000"/>
                      </svg>
                    </div>
                  </div>
                </div>

                 <div className="summary-card">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-600 text-sm">Active Users</h4>
                  </div>
                  <div className="flex items-end space-x-2">
                    <span className="text-3xl font-bold text-gray-800">3,318</span>
                    <span className="text-green-500 text-sm font-medium">+6.03%</span>
                    <div className="w-4 h-4 mb-1">
                      <svg viewBox="0 0 16 16" className="w-full h-full">
                        <path d="M8 2L12 6H9V14H7V6H4L8 2Z" fill="#10B981"/>
                      </svg>
                    </div>
                    <div className="chart-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.122072 12.6277C-0.0371494 12.3204 -0.0423126 11.8118 0.11054 11.4918L2.79613 5.86787C2.87149 5.71005 2.97561 5.62084 3.08443 5.62084C3.19325 5.62084 3.29736 5.71005 3.37273 5.86787L5.00271 9.28121L6.93429 5.23628L5.55811 2.58036L9.99023 -0.00304508L8.88707 9.00499L7.51089 6.34906L5.291 10.9977C5.21564 11.1555 5.11153 11.2447 5.00271 11.2447C4.89389 11.2447 4.78977 11.1555 4.71441 10.9977L3.08443 7.58437L0.687133 12.6045C0.53428 12.9246 0.281294 12.935 0.122072 12.6277Z" fill="#000"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Total Profiles */}
                <div className="summary-card summary-card-rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-600 text-sm">Total Profiles</h4>
                  </div>
                  <div className="flex items-end space-x-2">
                    <span className="text-3xl font-bold text-gray-800">3,318</span>
                    <span className="text-green-500 text-sm font-medium">+6.03%</span>
                    <div className="w-4 h-4 mb-1">
                      <svg viewBox="0 0 16 16" className="w-full h-full">
                        <path d="M8 2L12 6H9V14H7V6H4L8 2Z" fill="#10B981"/>
                      </svg>
                    </div>
                    <div className="chart-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.122072 12.6277C-0.0371494 12.3204 -0.0423126 11.8118 0.11054 11.4918L2.79613 5.86787C2.87149 5.71005 2.97561 5.62084 3.08443 5.62084C3.19325 5.62084 3.29736 5.71005 3.37273 5.86787L5.00271 9.28121L6.93429 5.23628L5.55811 2.58036L9.99023 -0.00304508L8.88707 9.00499L7.51089 6.34906L5.291 10.9977C5.21564 11.1555 5.11153 11.2447 5.00271 11.2447C4.89389 11.2447 4.78977 11.1555 4.71441 10.9977L3.08443 7.58437L0.687133 12.6045C0.53428 12.9246 0.281294 12.935 0.122072 12.6277Z" fill="#000"/>
                      </svg>
                    </div>
                  </div>
                </div>
               </div> 
              


            {/* Users and their Feedbacks and Tickets Section */}
            <div className="charts-rounded rounded-lg mb-8">
              {/* Charts Section */}
              <div className="grid grid-cols-2 gap-8">
                {/* Traffic Location */}
              <div className="bg-white rounded-lg p-6 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Traffic Location</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={[
                          { country: 'US', users: 4500, fill: '#D1EFFE' },
                          { country: 'Canada', users: 2800, fill: '#DEECF5' },
                          { country: 'Japan', users: 2200, fill: '#F5F5F5' },
                          { country: 'India', users: 1800, fill: '#1D81EC' },
                          { country: 'Mexico', users: 1200, fill: '#A4DCFD' },
                          { country: 'Australia', users: 900, fill: '#5E7590' }
                        ]} 
                        barCategoryGap="20%"
                      >
                        <XAxis 
                          dataKey="country" 
                          fontSize={14}
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: '#464646',
                            fontFamily: 'Inter',
                            fontSize: 14,
                            fontWeight: 500,
                            textAnchor: 'middle'
                          }}
                        />
                        <Tooltip />
                        <Bar dataKey="users" radius={[8, 8, 8, 8]} maxBarSize={32} fill="#8884d8">
                          <Cell fill="#D1EFFE" />
                          <Cell fill="#DEECF5" />
                          <Cell fill="#F5F5F5" />
                          <Cell fill="#1D81EC" />
                          <Cell fill="#A4DCFD" />
                          <Cell fill="#5E7590" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-right">
                    <button className="text-blue-500 text-sm hover:underline">View More Report</button>
                  </div>
                </div>
                </div>

                {/* User Create Portfolio Types */}
                <div className="bg-white rounded-lg p-6 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-5">User Create Portfolio Types</h4>
                  
                  <div className="flex items-center justify-between">
                    {/* Legend */}
                    <div className="mr-3 space-y-3" style={{ width: '184px' }}>
                      {[
                        { name: 'Personal', users: '• Users', color: '#D1EFFE' },
                        { name: 'Academic', users: '• Users', color: '#A4DCFD' },
                        { name: 'Corporate', users: '• Users', color: '#76C2F9' },
                        { name: 'Business', users: '• Users', color: '#53A8F3' },
                        { name: 'Matrimonial', users: '• Users', color: '#1D81EC' },
                        { name: 'Creative', users: '• Users', color: '#1564CA' },
                        { name: 'Volunteer', users: '• Users', color: '#0E4AA9' },
                        { name: 'Lifestyle', users: '• Users', color: '#093488' },
                        { name: 'Professional', users: '• Users', color: '#052471' }
                      ].map((type) => (
                        <div key={type.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <div 
                              className="w-2 h-2 rounded-full mr-1" 
                              style={{ backgroundColor: type.color }}
                            ></div>
                            <span className="text-gray-700">{type.name}</span>
                          </div>
                          <span className="text-gray-500">{type.users}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pie Chart */}
                    <div className="w-68 h-68 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Personal', value: 15, color: '#D1EFFE' },
                              { name: 'Academic', value: 12, color: '#A4DCFD' },
                              { name: 'Corporate', value: 10, color: '#76C2F9' },
                              { name: 'Business', value: 11, color: '#53A8F3' },
                              { name: 'Matrimonial', value: 8, color: '#1D81EC' },
                              { name: 'Creative', value: 14, color: '#1564CA' },
                              { name: 'Volunteer', value: 9, color: '#0E4AA9' },
                              { name: 'Lifestyle', value: 13, color: '#093488' },
                              { name: 'Professional', value: 8, color: '#052471' }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={85}
                            outerRadius={135}
                            dataKey="value"
                          >
                            {[
                              { name: 'Personal', value: 15, color: '#D1EFFE' },
                              { name: 'Academic', value: 12, color: '#A4DCFD' },
                              { name: 'Corporate', value: 10, color: '#76C2F9' },
                              { name: 'Business', value: 11, color: '#53A8F3' },
                              { name: 'Matrimonial', value: 8, color: '#1D81EC' },
                              { name: 'Creative', value: 14, color: '#1564CA' },
                              { name: 'Volunteer', value: 9, color: '#0E4AA9' },
                              { name: 'Lifestyle', value: 13, color: '#093488' },
                              { name: 'Professional', value: 8, color: '#052471' }
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Total Portfolio Users</div>
                          <div className="text-lg font-bold text-gray-800">50,000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            
          </div>

          {/* User data section */}
          <div className="user-data-container">
            <div className="user-data-controls">
              {/* User data label */}
              <div className="user-data-label">
                <h3 className="text-lg font-semibold text-gray-800">User data</h3>
              </div>

              {/* Select Time Period */}
              <div className="dropdown-container">
                <label className="block text-sm text-gray-600 mb-2">Select Time Period</label>
                <select className="dropdown-select">
                  <option value="19-january-2025">19 January 2025</option>
                  <option value="20-january-2025">20 January 2025</option>
                  <option value="21-january-2025">21 January 2025</option>
                </select>
              </div>

              {/* Select User type */}
              <div className="dropdown-container-wide">
                <label className="block text-sm text-gray-600 mb-2 mr-6">Select User type</label>
                <select 
                  className="dropdown-select dropdown-select-wide"
                  value={selectedUserType}
                  onChange={(e) => setSelectedUserType(e.target.value)}
                >
                  <option value="all-user-data">All User Data</option>
                  <option value="new-users">New Users</option>
                  <option value="active-users">Active Users</option>
                  <option value="download-app-data">Download App Data</option>
                </select>
              </div>

              {/* Group By */}
              <div className="button-group-container">
                <label className="block text-sm text-gray-600 mb-2">Group By</label>
                <div className="button-group">
                  <button className="group-button group-button-day">Day</button>
                  <button className="group-button group-button-week">Week</button>
                  <button className="group-button group-button-month">Month</button>
                  <button className="group-button group-button-year">Year</button>
                </div>
              </div>
            </div>
          </div>

          {/* User Engagement Section */}
          <div>
            <h3 className="user-engagement-title">User Engagement</h3>
          </div>

          {/* Legend of User Engagement */}
              <div className="legend-container">
                <div className="flex items-center">
                  <div className="legend-indicator bg-purple-500"></div>
                  <span className="text-sm text-gray-700">
                    {selectedUserType === 'new-users' ? 'New User' : 'New User'}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="legend-indicator bg-blue-600"></div>
                  <span className="text-sm text-gray-700">
                    {selectedUserType === 'active-users' ? 'Active User' : 'Active User'}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="legend-indicator bg-orange-400"></div>
                  <span className="text-sm text-gray-700">
                    {selectedUserType === 'download-app-data' ? 'Download App' : 'Download App'}
                  </span>
                </div>
              </div>
          {/* User Engagement Chart */}
          <div className="uec bg-white rounded-lg mb-8">
            <div className="mb-6">
              {/* Chart Container */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={getChartDataByPeriod(activeTab)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.4}/>
                        <stop offset="100%" stopColor="#EC4899" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorActiveUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity={0.8}/>
                        <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.4}/>
                        <stop offset="100%" stopColor="#EC4899" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FB923C" stopOpacity={0.8}/>
                        <stop offset="50%" stopColor="#FDBA74" stopOpacity={0.4}/>
                        <stop offset="100%" stopColor="#FED7AA" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="period" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      domain={[0, getMaxValue(getChartDataByPeriod(activeTab))]}
                      label={{ 
                        value: 'Visitor Number', 
                        angle: -89.958, 
                        position: 'insideLeft', 
                        style: { 
                          textAnchor: 'middle', 
                          fill: '#718EBF',
                          WebkitTextStrokeWidth: '1px',
                          WebkitTextStrokeColor: '#718EBF',
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '400',
                          lineHeight: 'normal',
                          width: '202.55px',
                          height: '28.967px',
                          flexShrink: '0'
                        } 
                      }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    {(selectedUserType === 'all-user-data' || selectedUserType === 'active-users') && (
                      <Area
                        type="monotone"
                        dataKey="activeUsers"
                        stroke="#2563EB"
                        strokeWidth={3}
                        fill="url(#colorActiveUsers)"
                        dot={false}
                      />
                    )}
                    {(selectedUserType === 'all-user-data' || selectedUserType === 'new-users') && (
                      <Area 
                        type="monotone" 
                        dataKey="newUsers" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        fill="url(#colorNewUsers)"
                        dot={false}
                      />
                    )}
                    {(selectedUserType === 'all-user-data' || selectedUserType === 'download-app-data') && (
                      <Area 
                        type="monotone" 
                        dataKey="downloads" 
                        stroke="#FB923C" 
                        strokeWidth={3}
                        fill="url(#colorDownloads)"
                        dot={false}
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Year indicator */}
              <div className="text-center mt-4">
                <span className="text-sm text-gray-400">2024 - 2025 YEAR</span>
              </div>
            </div>
          </div>

          {/* Overview Tabs Section - Repeated below User Engagement */}
          <div style={{ width: '580px', flexShrink: 0 }} className="mb-8">
            <div className="flex items-center border-b">
              <h1 style={{
                color: '#2E2A2A',
                fontFamily: 'Inter',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '140%',
                marginRight: '40px'
              }}>
                Marketing
              </h1>
              <div className="flex items-center space-x-2">
                {['Daily', 'Weekly', 'Monthly', 'Yearly and Till Date'].map((tab, index) => (
                  <React.Fragment key={tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      style={{
                        color: '#2E2A2A',
                        fontFamily: 'Inter',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '140%',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {tab}
                    </button>
                    {index < 3 && (
                      <span style={{
                        color: '#2E2A2A',
                        fontFamily: 'Inter',
                        fontSize: '24px',
                        fontWeight: 300,
                        alignSelf: 'flex-end',
                        paddingBottom: '2px',
                        lineHeight: '1'
                      }}>
                        |
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Summary Cards */}
          <div className="flex flex-wrap justify-between gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg flex-1 min-w-0" style={{
              maxWidth: '200px',
              height: '112px',
              flexShrink: 0
            }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-gray-600 text-sm">Social Events</h4>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-800">100</span>
                <span className=" text-gray-700 text-sm font-medium">+16.03%</span>
                <div className="w-4 h-4 mb-1">
                  <svg viewBox="0 0 16 16" className="w-full h-full">
                    <path d="M8 2L12 6H9V14H7V6H4L8 2Z" fill="#10B981"/>
                  </svg>
                </div>
                <div style={{
                  width: '9.991px',
                  height: '12.855px',
                  flexShrink: 0
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.122072 12.6277C-0.0371494 12.3204 -0.0423126 11.8118 0.11054 11.4918L2.79613 5.86787C2.87149 5.71005 2.97561 5.62084 3.08443 5.62084C3.19325 5.62084 3.29736 5.71005 3.37273 5.86787L5.00271 9.28121L6.93429 5.23628L5.55811 2.58036L9.99023 -0.00304508L8.88707 9.00499L7.51089 6.34906L5.291 10.9977C5.21564 11.1555 5.11153 11.2447 5.00271 11.2447C4.89389 11.2447 4.78977 11.1555 4.71441 10.9977L3.08443 7.58437L0.687133 12.6045C0.53428 12.9246 0.281294 12.935 0.122072 12.6277Z" fill="#000"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg flex-1 min-w-0" style={{
              maxWidth: '200px',
              height: '112px',
              flexShrink: 0
            }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-gray-600 text-sm">Visits LinkedIn</h4>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-800">3,318</span>
                <span className=" text-gray-700 text-sm font-medium">+6.03%</span>
                <div className="w-4 h-4 mb-1">
                  <svg viewBox="0 0 16 16" className="w-full h-full">
                    <path d="M8 2L12 6H9V14H7V6H4L8 2Z" fill="#10B981"/>
                  </svg>
                </div>
                <div style={{
                  width: '9.991px',
                  height: '12.855px',
                  flexShrink: 0
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.122072 12.6277C-0.0371494 12.3204 -0.0423126 11.8118 0.11054 11.4918L2.79613 5.86787C2.87149 5.71005 2.97561 5.62084 3.08443 5.62084C3.19325 5.62084 3.29736 5.71005 3.37273 5.86787L5.00271 9.28121L6.93429 5.23628L5.55811 2.58036L9.99023 -0.00304508L8.88707 9.00499L7.51089 6.34906L5.291 10.9977C5.21564 11.1555 5.11153 11.2447 5.00271 11.2447C4.89389 11.2447 4.78977 11.1555 4.71441 10.9977L3.08443 7.58437L0.687133 12.6045C0.53428 12.9246 0.281294 12.935 0.122072 12.6277Z" fill="#000"/>
                  </svg>
                </div>
              </div>
            </div>

             <div className="bg-white p-4 rounded-lg flex-1 min-w-0" style={{
              maxWidth: '200px',
              height: '112px',
              flexShrink: 0
            }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-gray-600 text-sm">Visits Instagram</h4>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-800">3,318</span>
                <span className=" text-gray-700 text-sm font-medium">+6.03%</span>
                <div className="w-4 h-4 mb-1">
                  <svg viewBox="0 0 16 16" className="w-full h-full">
                    <path d="M8 2L12 6H9V14H7V6H4L8 2Z" fill="#10B981"/>
                  </svg>
                </div>
                <div style={{
                  width: '9.991px',
                  height: '12.855px',
                  flexShrink: 0
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.122072 12.6277C-0.0371494 12.3204 -0.0423126 11.8118 0.11054 11.4918L2.79613 5.86787C2.87149 5.71005 2.97561 5.62084 3.08443 5.62084C3.19325 5.62084 3.29736 5.71005 3.37273 5.86787L5.00271 9.28121L6.93429 5.23628L5.55811 2.58036L9.99023 -0.00304508L8.88707 9.00499L7.51089 6.34906L5.291 10.9977C5.21564 11.1555 5.11153 11.2447 5.00271 11.2447C4.89389 11.2447 4.78977 11.1555 4.71441 10.9977L3.08443 7.58437L0.687133 12.6045C0.53428 12.9246 0.281294 12.935 0.122072 12.6277Z" fill="#000"/>
                  </svg>
                </div>
              </div>
            </div>

             <div className="bg-white p-4 rounded-lg flex-1 min-w-0" style={{
              maxWidth: '200px',
              height: '112px',
              flexShrink: 0
            }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-gray-600 text-sm">Visits Website</h4>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-800">3,318</span>
                <span className=" text-gray-700 text-sm font-medium">+6.03%</span>
                <div className="w-4 h-4 mb-1">
                  <svg viewBox="0 0 16 16" className="w-full h-full">
                    <path d="M8 2L12 6H9V14H7V6H4L8 2Z" fill="#10B981"/>
                  </svg>
                </div>
                <div style={{
                  width: '9.991px',
                  height: '12.855px',
                  flexShrink: 0
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.122072 12.6277C-0.0371494 12.3204 -0.0423126 11.8118 0.11054 11.4918L2.79613 5.86787C2.87149 5.71005 2.97561 5.62084 3.08443 5.62084C3.19325 5.62084 3.29736 5.71005 3.37273 5.86787L5.00271 9.28121L6.93429 5.23628L5.55811 2.58036L9.99023 -0.00304508L8.88707 9.00499L7.51089 6.34906L5.291 10.9977C5.21564 11.1555 5.11153 11.2447 5.00271 11.2447C4.89389 11.2447 4.78977 11.1555 4.71441 10.9977L3.08443 7.58437L0.687133 12.6045C0.53428 12.9246 0.281294 12.935 0.122072 12.6277Z" fill="#000"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg flex-1 min-w-0" style={{
              maxWidth: '200px',
              height: '112px',
              flexShrink: 0,
              borderRadius: '16px'
            }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-gray-600 text-sm">Download App</h4>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-800">3,318</span>
                <span className=" text-gray-700 text-sm font-medium">+6.03%</span>
                <div className="w-4 h-4 mb-1">
                  <svg viewBox="0 0 16 16" className="w-full h-full">
                    <path d="M8 2L12 6H9V14H7V6H4L8 2Z" fill="#10B981"/>
                  </svg>
                </div>
                <div style={{
                  width: '9.991px',
                  height: '12.855px',
                  flexShrink: 0
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.122072 12.6277C-0.0371494 12.3204 -0.0423126 11.8118 0.11054 11.4918L2.79613 5.86787C2.87149 5.71005 2.97561 5.62084 3.08443 5.62084C3.19325 5.62084 3.29736 5.71005 3.37273 5.86787L5.00271 9.28121L6.93429 5.23628L5.55811 2.58036L9.99023 -0.00304508L8.88707 9.00499L7.51089 6.34906L5.291 10.9977C5.21564 11.1555 5.11153 11.2447 5.00271 11.2447C4.89389 11.2447 4.78977 11.1555 4.71441 10.9977L3.08443 7.58437L0.687133 12.6045C0.53428 12.9246 0.281294 12.935 0.122072 12.6277Z" fill="#000"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom User Data Section */}
          <div className="rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              {/* User data label */}
              <div className="socialMedia mr-6">
                <h3 className="text-lg font-semibold text-gray-800">Social Media</h3>
              </div>

              {/* Select Time Period */}
              <div className="w-60 ml-6 mr-6">
                <label className="block text-sm text-gray-600 mb-2">Select Time Period</label>
                <select className="p-2 text-sm text-gray-500 mb-2" style={{
                  width: '235px',
                  height: '50px',
                  flexShrink: 0,
                  borderRadius: '15px',
                  border: '1px solid #DFEAF2',
                  background: '#FFF'
                }}>
                  <option value="19-january-2025">19 January 2025</option>
                  <option value="20-january-2025">20 January 2025</option>
                  <option value="21-january-2025">21 January 2025</option>
                </select>
              </div>

              {/* Select User type */}
              <div className="w-60 mr-6">
                <label className="block text-sm text-gray-600 mb-2 mr-6">Select User type</label>
                <select 
                  className="p-2 text-sm text-gray-500"
                  value={selectedSocialMediaType}
                  onChange={(e) => setSelectedSocialMediaType(e.target.value)}
                  style={{
                  width: '275px',
                  height: '50px',
                  flexShrink: 0,
                  borderRadius: '15px',
                  border: '1px solid #DFEAF2',
                  background: '#FFF'
                }}>
                  <option value="all-user-data">All Social Media Data</option>
                  <option value="instagram-data">Instagram Data</option>
                  <option value="linkedin-data">LinkedIn Data</option>
                  <option value="view-to-website-data">Visit To Website Data</option>
                </select>
              </div>

              {/* Group By */}
              <div className="w-64 ml-6">
                <label className="block text-sm text-gray-600 mb-2">Group By</label>
                <div className="flex space-x-2">
                  <button className="text-sm text-gray-500 hover:bg-gray-50" style={{
                    width: '60px',
                    height: '50px',
                    flexShrink: 0,
                    borderRadius: '15px',
                    border: '1px solid #DFEAF2',
                    background: '#FFF'
                  }}>Day</button>
                  <button className="text-sm text-gray-500 hover:bg-gray-50" style={{
                    width: '70px',
                    height: '50px',
                    flexShrink: 0,
                    borderRadius: '15px',
                    border: '1px solid #DFEAF2',
                    background: '#FFF'
                  }}>Week</button>
                  <button className="text-sm text-gray-500 hover:bg-gray-50" style={{
                    width: '75px',
                    height: '50px',
                    flexShrink: 0,
                    borderRadius: '15px',
                    border: '1px solid #DFEAF2',
                    background: '#FFF'
                  }}>Month</button>
                  <button className="text-sm text-gray-500 hover:bg-gray-50" style={{
                    width: '65px',
                    height: '50px',
                    flexShrink: 0,
                    borderRadius: '15px',
                    border: '1px solid #DFEAF2',
                    background: '#FFF'
                  }}>Year</button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Engagement Chart */}

          <div>
            <h3 className="social-media-title font-semibold text-gray-800 mb-12">Social Media Engagement</h3>
          </div>
          {/* Legend */}
              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-2 bg-gray-600 mr-2 rounded"></div>
                  <span className="text-sm text-gray-700">All</span>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-2 bg-purple-600 mr-2 rounded"></div>
                  <span className={`text-sm ${selectedSocialMediaType === 'instagram-data' ? 'text-purple-600 font-semibold' : 'text-gray-700'}`}>
                    Instagram
                    {selectedSocialMediaType === 'instagram-data' && <span className="ml-1 text-xs">↗️ Enhanced</span>}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-2 bg-blue-600 mr-2 rounded"></div>
                  <span className={`text-sm ${selectedSocialMediaType === 'linkedin-data' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
                    LinkedIn
                    {selectedSocialMediaType === 'linkedin-data' && <span className="ml-1 text-xs">↗️ Enhanced</span>}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-2 bg-yellow-600 mr-2 rounded"></div>
                  <span className={`text-sm ${selectedSocialMediaType === 'view-to-website-data' ? 'text-yellow-600 font-semibold' : 'text-gray-700'}`}>
                    Visit To Website
                    {selectedSocialMediaType === 'view-to-website-data' && <span className="ml-1 text-xs">↗️ Enhanced</span>}
                  </span>
                </div>
              </div>
          <div className="sme bg-white rounded-lg mb-8">
            <div className="mb-6">
              
              

              {/* Chart Container */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={getSocialMediaChartDataByPeriod(activeTab)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="colorNewUsersBottom" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.4}/>
                        <stop offset="100%" stopColor="#EC4899" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorActiveUsersBottom" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity={0.8}/>
                        <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.4}/>
                        <stop offset="100%" stopColor="#EC4899" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorDownloadsBottom" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FB923C" stopOpacity={0.8}/>
                        <stop offset="50%" stopColor="#FDBA74" stopOpacity={0.4}/>
                        <stop offset="100%" stopColor="#FED7AA" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="period" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      domain={[0, getSocialMediaMaxValue(getSocialMediaChartDataByPeriod(activeTab))]}
                      label={{ 
                        value: 'Visitor Number', 
                        angle: -89.958, 
                        position: 'insideLeft', 
                        style: { 
                          textAnchor: 'middle', 
                          fill: '#718EBF',
                          WebkitTextStrokeWidth: '1px',
                          WebkitTextStrokeColor: '#718EBF',
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '400',
                          lineHeight: 'normal',
                          width: '202.55px',
                          height: '28.967px',
                          flexShrink: '0'
                        } 
                      }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    {(selectedSocialMediaType === 'all-user-data' || selectedSocialMediaType === 'instagram-data') && (
                      <Area
                        type="monotone"
                        dataKey="instagramData"
                        stroke="#2563EB"
                        strokeWidth={3}
                        fill="url(#colorActiveUsersBottom)"
                        dot={false}
                      />
                    )}
                    {(selectedSocialMediaType === 'all-user-data' || selectedSocialMediaType === 'linkedin-data') && (
                      <Area 
                        type="monotone" 
                        dataKey="linkedinData" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        fill="url(#colorNewUsersBottom)"
                        dot={false}
                      />
                    )}
                    {(selectedSocialMediaType === 'all-user-data' || selectedSocialMediaType === 'view-to-website-data') && (
                      <Area 
                        type="monotone" 
                        dataKey="viewToWebsite" 
                        stroke="#FB923C" 
                        strokeWidth={3}
                        fill="url(#colorDownloadsBottom)"
                        dot={false}
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Year indicator */}
              <div className="text-center mt-4">
                <span className="text-sm text-gray-400">2024 - 2025 YEAR</span>
              </div>
            </div>
          </div>
          
          </>
        ) : (
          <>
            {/* Traffic Info and Data Analysis Section - Empty for now */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Traffic Info and Data Analysis</h2>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>This section will be built later.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard