'use client'
import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function DataVisualization({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return []
    
    // Example: Group data by first column and count occurrences
    const firstColumn = Object.keys(data[0])[0]
    const groupedData = data.reduce((acc, item) => {
      const key = item[firstColumn]
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
    
    return Object.entries(groupedData)
      .map(([name, value]) => ({ name, value }))
      .slice(0, 10) // Limit to top 10 items
  }, [data])

  const numericData = useMemo(() => {
    if (!data || data.length === 0) return []
    
    // Find numeric columns
    const numericColumns = Object.keys(data[0]).filter(key => 
      data.some(row => !isNaN(parseFloat(row[key])))
    )
    
    if (numericColumns.length === 0) return []
    
    return data.slice(0, 50).map((row, index) => ({
      index,
      ...numericColumns.reduce((acc, col) => ({
        ...acc,
        [col]: parseFloat(row[col]) || 0
      }), {})
    }))
  }, [data])

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500 text-center">No data available for visualization</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Proportion</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart (if numeric data exists) */}
      {numericData.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={numericData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="index" />
              <YAxis />
              <Tooltip />
              {Object.keys(numericData[0] || {})
                .filter(key => key !== 'index')
                .slice(0, 3)
                .map((key, index) => (
                  <Line 
                    key={key} 
                    type="monotone" 
                    dataKey={key} 
                    stroke={COLORS[index]} 
                    strokeWidth={2}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}