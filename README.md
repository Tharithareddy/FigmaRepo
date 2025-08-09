# FigmaRepo

A React-based analytics dashboard created with reference from Figma design, featuring interactive data visualization and user engagement metrics.

## Features

- 📊 Interactive dashboard with data visualization using Recharts
- 🎯 User type filtering (New Users, Active Users, Download Data)
- 📈 Multiple chart types (Area charts, Bar charts, Pie charts)
- 🔄 Dynamic time period selection (Daily, Weekly, Monthly, Yearly)
- 🎨 Responsive design with CSS Grid and Flexbox
- ⚛️ Redux state management
- 🏗️ Built with Next.js and React 19

## Technologies Used

- **Frontend**: Next.js 15, React 19, Redux Toolkit
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Styling**: CSS3, Tailwind CSS
- **Charts**: Recharts library
- **Data Management**: CSV parsing with PapaParse
- **State Management**: Redux with Redux Toolkit
- **Icons**: Lucide React
- **Security**: Helmet.js, CORS
- **Development**: Nodemon for auto-restart

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **Git**

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Tharithareddy/FigmaRepo.git
cd FigmaRepo
```

### 2. Install Dependencies

#### Frontend Setup
Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

#### Backend Setup
Navigate to the backend directory and install dependencies:

```bash
cd ../backend
npm install
```

or if you prefer yarn:

```bash
cd frontend
yarn install

cd ../backend
yarn install
```

### 3. Environment Setup

#### Frontend Environment (Optional)
If you plan to use Figma integration features, create a `.env.local` file in the frontend directory:

```env
# Figma API Configuration (Optional)
FIGMA_ACCESS_TOKEN=your_figma_access_token
FIGMA_FILE_KEY=your_figma_file_key
FIGMA_PROJECT_NAME=your_project_name
```

#### Backend Environment (Required for Backend)

**⚠️ SECURITY NOTICE: Never commit your `.env` file to version control!**

1. Copy the example environment file:
```bash
cd backend
cp .env.example .env
```

2. Edit the `.env` file with your actual credentials:
```env
# Use the template in backend/.env.example
# Fill in your actual MongoDB URI, Azure connection strings, etc.
```

**Required Environment Variables:**
- `MONGODB_URI` - Your MongoDB connection string (local or cloud)
- `AZURE_STORAGE_CONNECTION_STRING` - Your Azure Storage connection string  
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key

**🔒 The `.env` file is already added to `.gitignore` to prevent accidental commits.**

## Running the Project

### Full Stack Development Mode

#### 1. Start the Backend Server

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm run dev
```

The backend API will be available at: **http://localhost:5000**

#### 2. Start the Frontend Development Server

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm run dev
```

The frontend application will be available at: **http://localhost:3000**

### Individual Service Setup

#### Frontend Only (Recommended for basic usage)

```bash
cd frontend
npm run dev
```

#### Backend Only (API development)

```bash
cd backend
npm run dev
```

### Production Build

#### Frontend Production Build

```bash
cd frontend
npm run build
npm start
```

#### Backend Production

```bash
cd backend
npm start
```

## Backend API Documentation

### Available Endpoints

- **GET** `/api/data` - Retrieve CSV dashboard data
- **GET** `/api/engagement/user/:timeframe` - Get user engagement data
- **GET** `/api/engagement/social/:timeframe` - Get social media engagement data

### Backend Features

- 🔐 **Security**: Helmet.js for security headers, CORS configuration
- 📊 **Data Processing**: CSV file parsing and data transformation
- 🗄️ **Database**: MongoDB integration with Mongoose
- 📡 **API**: RESTful API endpoints for data retrieval
- 🔄 **Hot Reload**: Nodemon for development auto-restart
- ☁️ **Cloud Ready**: Azure Blob Storage integration support

## Project Structure

```
FigmaRepo/
├── frontend/                     # React frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css      # Global styles
│   │   │   ├── layout.js        # App layout wrapper
│   │   │   ├── page.js          # Main page component
│   │   │   └── providers.js     # Redux provider setup
│   │   ├── components/
│   │   │   ├── Dashboard.js     # Main dashboard component
│   │   │   ├── Dashboard.css    # Dashboard styles
│   │   │   ├── DashboardMain.js # Dashboard main content
│   │   │   ├── DashboardMetrics.js # Metrics components
│   │   │   ├── AdminOverview.js # Admin overview page
│   │   │   └── other components...
│   │   └── store/
│   │       ├── index.js         # Redux store configuration
│   │       └── slice/
│   │           └── dataSlice.js # Data management slice
│   ├── public/                  # Static assets
│   ├── package.json
│   └── config files...
├── backend/                     # Node.js backend API
│   ├── src/
│   │   ├── app.js              # Main server file
│   │   ├── config/
│   │   │   ├── database.js     # MongoDB connection
│   │   │   ├── azure.js        # Azure configuration
│   │   │   └── supabase.js     # Supabase configuration
│   │   ├── models/
│   │   │   └── Data.js         # MongoDB data models
│   │   ├── routes/
│   │   │   ├── data.js         # Data API routes
│   │   │   └── engagement.js   # Engagement API routes
│   │   └── components/
│   │       └── Dashboard.js    # Backend dashboard logic
│   ├── data/
│   │   └── Interview_datasetinin.csv # Sample dataset
│   ├── package.json
│   └── .env                    # Backend environment variables
└── README.md
```

## Dashboard Features

### 📊 Data Visualization
- **User Engagement Charts**: Track new users, active users, and app downloads
- **Social Media Analytics**: Monitor Instagram, LinkedIn, and website traffic
- **Time-based Analysis**: View data across different time periods

### 🎛️ Interactive Controls
- **User Type Filtering**: Filter data by user categories
- **Time Period Selection**: Switch between Daily, Weekly, Monthly, and Yearly views
- **Separate Filtering**: Independent controls for User Engagement and Social Media data

### 📱 Responsive Design
- Optimized for desktop and mobile devices
- Flexible grid layout that adapts to screen sizes
- Clean, modern UI inspired by Figma designs

## Usage

1. **Start the application** using the development command above
2. **Navigate to the dashboard** at http://localhost:3000
3. **Explore different views**:
   - Use the time period tabs (Daily, Weekly, Monthly, Yearly)
   - Filter data using the "Select User Type" dropdowns
   - View different chart visualizations
4. **Interact with charts**:
   - Hover over data points for detailed information
   - Use the legend to toggle chart lines
   - Switch between overview and detailed views

## Available Scripts

### Frontend Scripts

In the frontend directory, you can run:

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm start` - Runs the built app in production mode
- `npm run lint` - Runs the linter to check code quality

### Backend Scripts

In the backend directory, you can run:

- `npm start` - Runs the server in production mode
- `npm run dev` - Runs the server in development mode with nodemon
- `npm test` - Runs the test suite
- `npm run seed` - Seeds the database with sample data
- `npm run db:test` - Tests MongoDB connection
- `npm run db:start` - Starts local MongoDB service
- `npm run db:stop` - Stops local MongoDB service
- `npm run db:status` - Checks MongoDB service status

## Troubleshooting

### Common Issues

#### Frontend Issues

1. **Port 3000 already in use**:
   ```bash
   # Kill the process using port 3000
   npx kill-port 3000
   # Or use a different port
   npm run dev -- -p 3001
   ```

2. **Module not found errors**:
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**:
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

#### Backend Issues

1. **Port 5000 already in use**:
   ```bash
   # Kill the process using port 5000
   npx kill-port 5000
   # Or change PORT in .env file
   ```

2. **MongoDB connection issues**:
   ```bash
   # Test MongoDB connection
   npm run db:test
   
   # Start MongoDB service
   npm run db:start
   
   # Check service status
   npm run db:status
   ```

3. **Environment variables not loaded**:
   - Ensure `.env` file exists in backend directory
   - Check that all required environment variables are set
   - Restart the server after changing `.env` file

#### Database Setup

1. **Install MongoDB locally** (if not using cloud):
   - Windows: Download from [MongoDB official site](https://www.mongodb.com/try/download/community)
   - macOS: `brew install mongodb-community`
   - Linux: Follow [official installation guide](https://docs.mongodb.com/manual/installation/)

2. **Seed the database with sample data**:
   ```bash
   cd backend
   npm run seed
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the project maintainers.

---

**Happy Coding! 🚀**
