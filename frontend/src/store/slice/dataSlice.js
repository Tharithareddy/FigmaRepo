import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk for fetching CSV data
export const fetchCSVData = createAsyncThunk(
  'data/fetchCSVData',
  async (_, { rejectWithValue }) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      if (!apiUrl) {
        // Sample data fallback
        return [
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
      }

      console.log('Fetching from:', `${apiUrl}/data/csv`)
      const response = await fetch(`${apiUrl}/data/csv`)
      
      if (!response.ok) {
        if (response.status === 404) {
          console.log('No data in database, returning sample data')
          return []
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('Received data:', data.length, 'records')
      return data
    } catch (error) {
      console.error('API Error:', error)
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  csvData: [],
  filteredData: [],
  loading: false,
  error: null,
  filters: {},
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload
      // Apply filters to data
      state.filteredData = state.csvData.filter(item => {
        return Object.entries(action.payload).every(([key, value]) => {
          if (!value) return true
          return item[key]?.toString().toLowerCase().includes(value.toString().toLowerCase())
        })
      })
    },
    clearFilters: (state) => {
      state.filters = {}
      state.filteredData = state.csvData
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCSVData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCSVData.fulfilled, (state, action) => {
        state.loading = false
        state.csvData = action.payload
        state.filteredData = action.payload
      })
      .addCase(fetchCSVData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setFilters, clearFilters } = dataSlice.actions
export default dataSlice.reducer