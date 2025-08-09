const express = require('express')
const multer = require('multer')
const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')
const { Readable } = require('stream')

const router = express.Router()

// Sample data fallback - matches your CSV structure
const sampleData = [
  {
    'Member Name': 'John Doe',
    'Username': 'johndoe',
    'No. Of Portfolios': 3,
    'ID Verification': 'Verified',
    'Portfolio Verification': 'Verified',
    'Location': 'New York, USA',
    'Size (KB)': 1024.5,
    'Subscription': 'Premium'
  },
  {
    'Member Name': 'Jane Smith',
    'Username': 'janesmith',
    'No. Of Portfolios': 2,
    'ID Verification': 'Verified',
    'Portfolio Verification': 'Not verified',
    'Location': 'London, UK',
    'Size (KB)': 512.8,
    'Subscription': 'Standard'
  },
  {
    'Member Name': 'Bob Johnson',
    'Username': 'bobjohnson',
    'No. Of Portfolios': 5,
    'ID Verification': 'Not verified',
    'Portfolio Verification': 'Verified',
    'Location': 'Toronto, Canada',
    'Size (KB)': 2048.3,
    'Subscription': 'Advanced'
  },
  {
    'Member Name': 'Alice Wilson',
    'Username': 'alicewilson',
    'No. Of Portfolios': 1,
    'ID Verification': 'Verified',
    'Portfolio Verification': 'Verified',
    'Location': 'Sydney, Australia',
    'Size (KB)': 256.7,
    'Subscription': 'Basic'
  },
  {
    'Member Name': 'Charlie Brown',
    'Username': 'charliebrown',
    'No. Of Portfolios': 4,
    'ID Verification': 'Verified',
    'Portfolio Verification': 'Not verified',
    'Location': 'Berlin, Germany',
    'Size (KB)': 1536.2,
    'Subscription': 'Premium'
  }
]

// Safe import of Data model with error handling
let Data = null
try {
  Data = require('../models/Data')
  console.log('✅ Data model loaded successfully')
} catch (error) {
  console.log('⚠️  Data model not found, using sample data only')
  console.log('   Make sure ../models/Data.js exists')
}

// Parse CSV from file path
const parseCSVFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = []
    
    if (!fs.existsSync(filePath)) {
      reject(new Error(`CSV file not found: ${filePath}`))
      return
    }
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        try {
          // Clean and process the data
          const cleanedData = {}
          Object.keys(data).forEach(key => {
            const cleanKey = key.trim()
            let value = data[key]
            
            // Convert numeric values
            if (cleanKey === 'No. Of Portfolios') {
              value = parseInt(value) || 0
            } else if (cleanKey === 'Size (KB)') {
              value = parseFloat(value) || 0
            }
            
            cleanedData[cleanKey] = value
          })
          results.push(cleanedData)
        } catch (error) {
          console.error('Error processing CSV row:', error)
        }
      })
      .on('end', () => {
        console.log(`✅ Parsed ${results.length} rows from CSV`)
        resolve(results)
      })
      .on('error', (error) => {
        console.error('CSV parsing error:', error)
        reject(error)
      })
  })
}

// Load and save CSV data to database
const loadCSVData = async () => {
  try {
    // Path to your CSV file
    const csvFilePath = path.join(__dirname, '../../data/Interview_datasetinin.csv')
    
    console.log('🔍 Looking for CSV file at:', csvFilePath)
    
    // Check if file exists
    if (!fs.existsSync(csvFilePath)) {
      console.log('❌ CSV file not found at:', csvFilePath)
      console.log('📝 Using sample data instead')
      return sampleData
    }

    // If no Data model, just parse and return CSV data
    if (!Data) {
      console.log('📄 No database model, parsing CSV file directly...')
      const parsedData = await parseCSVFromFile(csvFilePath)
      return parsedData
    }

    // Check if data already exists in database
    const existingData = await Data.findOne({ filename: 'Interview_datasetinin.csv' })
    if (existingData) {
      console.log('✅ CSV data already loaded in database')
      return existingData.data
    }

    // Parse CSV file
    console.log('📄 Loading CSV data from file...')
    const parsedData = await parseCSVFromFile(csvFilePath)
    
    // Save to database
    const dataRecord = new Data({
      filename: 'Interview_datasetinin.csv',
      originalName: 'Interview Dataset',
      data: parsedData,
      uploadedBy: 'system',
      metadata: {
        rows: parsedData.length,
        columns: parsedData.length > 0 ? Object.keys(parsedData[0]) : [],
        size: fs.statSync(csvFilePath).size
      }
    })
    
    await dataRecord.save()
    console.log(`✅ Saved ${parsedData.length} records to database`)
    
    return parsedData
  } catch (error) {
    console.error('❌ Error loading CSV data:', error.message)
    console.log('📝 Falling back to sample data')
    return sampleData
  }
}

// Initialize CSV data on server start (with error handling)
let csvDataCache = null
const initializeData = async () => {
  try {
    csvDataCache = await loadCSVData()
    console.log(`📊 Initialized with ${csvDataCache.length} records`)
  } catch (error) {
    console.error('❌ Failed to initialize CSV data:', error.message)
    csvDataCache = sampleData
    console.log('📝 Using sample data as fallback')
  }
}

// Call initialization
initializeData()

// Test route
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Data API is working!',
    endpoints: ['/csv', '/metadata', '/reload-csv'],
    dataAvailable: csvDataCache ? csvDataCache.length : 0,
    databaseConnected: Data ? true : false
  })
})

// Get CSV data - simplified version
router.get('/csv', async (req, res) => {
  try {
    console.log('📊 API called: /api/data/csv')
    
    // If we have cached data, return it
    if (csvDataCache && csvDataCache.length > 0) {
      console.log(`📤 Returning ${csvDataCache.length} cached records`)
      return res.json(csvDataCache)
    }

    // Try to load data if not cached
    if (!csvDataCache) {
      csvDataCache = await loadCSVData()
    }
    
    if (csvDataCache && csvDataCache.length > 0) {
      console.log(`📤 Returning ${csvDataCache.length} records`)
      return res.json(csvDataCache)
    }

    // Fallback to sample data
    console.log('📝 No data available, returning sample data')
    res.json(sampleData)
    
  } catch (error) {
    console.error('❌ Error in /csv route:', error.message)
    console.log('📝 Returning sample data due to error')
    res.json(sampleData)
  }
})

// Get CSV data by ID - only if database is available
router.get('/csv/:id', async (req, res) => {
  try {
    if (!Data) {
      return res.status(404).json({ error: 'Database not available' })
    }

    const { id } = req.params
    const dataRecord = await Data.findById(id)
    
    if (!dataRecord) {
      return res.status(404).json({ error: 'Data not found' })
    }
    
    res.json(dataRecord.data)
  } catch (error) {
    console.error('❌ Error fetching CSV data by ID:', error.message)
    res.status(500).json({ error: 'Failed to fetch data', message: error.message })
  }
})

// Get data metadata - only if database is available
router.get('/metadata', async (req, res) => {
  try {
    if (!Data) {
      return res.json([{
        filename: 'Sample Data',
        uploadedAt: new Date(),
        metadata: {
          rows: sampleData.length,
          columns: Object.keys(sampleData[0] || {}),
          size: 'N/A'
        },
        uploadedBy: 'system'
      }])
    }

    const dataRecords = await Data.find({}, 'filename uploadedAt metadata uploadedBy')
      .sort({ uploadedAt: -1 })
      .limit(10)
    
    res.json(dataRecords)
  } catch (error) {
    console.error('❌ Error fetching metadata:', error.message)
    res.status(500).json({ error: 'Failed to fetch metadata', message: error.message })
  }
})

// Endpoint to reload CSV data
router.post('/reload-csv', async (req, res) => {
  try {
    console.log('🔄 Reloading CSV data...')
    
    if (Data) {
      // Delete existing data from database
      await Data.deleteMany({ filename: 'Interview_datasetinin.csv' })
      console.log('🗑️  Cleared existing database records')
    }
    
    // Reload from file
    csvDataCache = await loadCSVData()
    
    if (csvDataCache && csvDataCache.length > 0) {
      res.json({
        message: 'CSV data reloaded successfully',
        records: csvDataCache.length,
        databaseUsed: Data ? true : false
      })
    } else {
      res.status(500).json({ error: 'Failed to reload CSV data' })
    }
  } catch (error) {
    console.error('❌ Error reloading CSV data:', error.message)
    res.status(500).json({ error: 'Failed to reload CSV data', message: error.message })
  }
})

module.exports = router