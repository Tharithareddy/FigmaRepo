const express = require('express')
const router = express.Router()

// Sample engagement data for user metrics
const generateUserEngagementData = (timeframe) => {
  const baseData = {
    daily: {
      newUsers: [120, 135, 98, 167, 189, 143, 201],
      activeUsers: [850, 920, 876, 1023, 1156, 987, 1234],
      downloads: [45, 52, 38, 67, 73, 59, 81],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    weekly: {
      newUsers: [450, 520, 380, 680, 720, 590, 810],
      activeUsers: [3200, 3650, 3100, 4200, 4500, 3800, 5100],
      downloads: [180, 210, 150, 280, 310, 240, 350],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']
    },
    monthly: {
      newUsers: [1800, 2100, 1650, 2800, 3200, 2400, 3500],
      activeUsers: [12800, 15200, 13500, 18600, 21000, 16800, 24500],
      downloads: [720, 850, 620, 1100, 1250, 980, 1400],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    yearly: {
      newUsers: [21600, 25200, 19800, 33600, 38400, 28800, 42000],
      activeUsers: [153600, 182400, 162000, 223200, 252000, 201600, 294000],
      downloads: [8640, 10200, 7440, 13200, 15000, 11760, 16800],
      labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025']
    }
  }

  return baseData[timeframe] || baseData.daily
}

// Sample social media engagement data
const generateSocialMediaData = (timeframe) => {
  const baseData = {
    daily: {
      instagram: [1250, 1380, 1120, 1567, 1789, 1343, 1901],
      linkedin: [850, 920, 776, 1123, 1256, 987, 1334],
      website: [2145, 2352, 2038, 2567, 2873, 2459, 2981],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    weekly: {
      instagram: [5250, 6380, 5120, 7567, 8789, 6343, 9901],
      linkedin: [3850, 4920, 3776, 5123, 6256, 4987, 6334],
      website: [9145, 11352, 8038, 12567, 14873, 10459, 16981],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']
    },
    monthly: {
      instagram: [21000, 25520, 20480, 30268, 35156, 25372, 39604],
      linkedin: [15400, 19680, 15104, 20492, 25024, 19948, 25336],
      website: [36580, 45408, 32152, 50268, 59492, 41836, 67924],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    yearly: {
      instagram: [252000, 306240, 245760, 363216, 421872, 304464, 475248],
      linkedin: [184800, 236160, 181248, 245904, 300288, 239376, 304032],
      website: [438960, 544896, 385824, 603216, 713904, 502032, 815088],
      labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025']
    }
  }

  return baseData[timeframe] || baseData.daily
}

// GET /api/engagement/user/:timeframe - Get user engagement data
router.get('/user/:timeframe', (req, res) => {
  try {
    const { timeframe } = req.params
    
    // Validate timeframe
    const validTimeframes = ['daily', 'weekly', 'monthly', 'yearly']
    if (!validTimeframes.includes(timeframe)) {
      return res.status(400).json({
        error: 'Invalid timeframe',
        message: 'Timeframe must be one of: daily, weekly, monthly, yearly'
      })
    }

    const data = generateUserEngagementData(timeframe)
    
    res.json({
      success: true,
      timeframe,
      data,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching user engagement data:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch user engagement data'
    })
  }
})

// GET /api/engagement/social/:timeframe - Get social media engagement data  
router.get('/social/:timeframe', (req, res) => {
  try {
    const { timeframe } = req.params
    
    // Validate timeframe
    const validTimeframes = ['daily', 'weekly', 'monthly', 'yearly']
    if (!validTimeframes.includes(timeframe)) {
      return res.status(400).json({
        error: 'Invalid timeframe',
        message: 'Timeframe must be one of: daily, weekly, monthly, yearly'
      })
    }

    const data = generateSocialMediaData(timeframe)
    
    res.json({
      success: true,
      timeframe,
      data,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching social media engagement data:', error)
    res.status(500).json({
      error: 'Internal server error', 
      message: 'Failed to fetch social media engagement data'
    })
  }
})

// GET /api/engagement/overview - Get engagement overview/summary
router.get('/overview', (req, res) => {
  try {
    const dailyUser = generateUserEngagementData('daily')
    const dailySocial = generateSocialMediaData('daily')
    
    // Calculate totals and averages
    const userTotals = {
      totalNewUsers: dailyUser.newUsers.reduce((a, b) => a + b, 0),
      totalActiveUsers: dailyUser.activeUsers.reduce((a, b) => a + b, 0),
      totalDownloads: dailyUser.downloads.reduce((a, b) => a + b, 0)
    }
    
    const socialTotals = {
      totalInstagram: dailySocial.instagram.reduce((a, b) => a + b, 0),
      totalLinkedin: dailySocial.linkedin.reduce((a, b) => a + b, 0),
      totalWebsite: dailySocial.website.reduce((a, b) => a + b, 0)
    }
    
    res.json({
      success: true,
      overview: {
        userEngagement: {
          ...userTotals,
          avgNewUsers: Math.round(userTotals.totalNewUsers / dailyUser.newUsers.length),
          avgActiveUsers: Math.round(userTotals.totalActiveUsers / dailyUser.activeUsers.length),
          avgDownloads: Math.round(userTotals.totalDownloads / dailyUser.downloads.length)
        },
        socialMedia: {
          ...socialTotals,
          avgInstagram: Math.round(socialTotals.totalInstagram / dailySocial.instagram.length),
          avgLinkedin: Math.round(socialTotals.totalLinkedin / dailySocial.linkedin.length),
          avgWebsite: Math.round(socialTotals.totalWebsite / dailySocial.website.length)
        }
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching engagement overview:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch engagement overview'
    })
  }
})

module.exports = router
