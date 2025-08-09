// src/config/database.js
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('⚠️  MONGODB_URI not found in .env file')
      console.log('📝 Server will run without database connection')
      return
    }

    console.log('🔄 Connecting to MongoDB...')
    console.log('📍 URI:', process.env.MONGODB_URI.replace(/:[^:@]*@/, ':****@'))
    
    // Updated connection options for newer MongoDB driver
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Removed deprecated options that cause the error
      // bufferCommands: false,     <- This causes the error
      // bufferMaxEntries: 0,       <- This causes the error
      maxPoolSize: 10,              // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000,       // Close sockets after 45 seconds of inactivity
      // Add these for better Azure Cosmos DB compatibility
      retryWrites: false,           // Important for Cosmos DB
      retryReads: false,            // Important for Cosmos DB
    })
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    console.log(`📊 Database: ${conn.connection.name}`)
    
    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('🔗 Mongoose connected to Azure Cosmos DB')
    })
    
    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err.message)
    })
    
    mongoose.connection.on('disconnected', () => {
      console.log('🔌 Mongoose disconnected')
    })
    
  } catch (error) {
    console.error('❌ Database connection error:', error.message)
    console.log('📝 Server will continue without database')
    
    // Don't exit - continue without database for now
    // process.exit(1)
  }
}

module.exports = { connectDB }