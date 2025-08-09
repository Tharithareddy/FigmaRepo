'use client'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { Search, Download, Upload, RefreshCw } from 'lucide-react'

const DashboardMetrics = () => {
  const dispatch = useDispatch()
  const { csvData, filteredData, loading, error } = useSelector(state => state.data)
  const [localState, setLocalState] = useState({})
  
  useEffect(() => {
    // Initialize component
  }, [])
  
  return (
    <div>
      <div className="bg-gray-100 rounded-2xl w-full"></div>
      <div>
        <p className="bg-gray-500 text-sm">Jul</p>
        <p className="bg-gray-500 text-sm">Aug</p>
        <p className="bg-gray-500 text-sm">Sep</p>
        <p className="bg-gray-500 text-sm">New User</p>
        <p className="bg-gray-500 text-sm">Active User</p>
        <p className="bg-gray-500 text-sm">Oct</p>
        <p className="bg-gray-500 text-sm">2024 - 2025 YEAR</p>
        <p className="bg-gray-500 text-sm">Visitor Numbers</p>
        <p className="bg-gray-500 text-sm">Nov </p>
        <p className="bg-gray-500 text-sm">Dec</p>
        <p className="bg-gray-500 text-sm">Jan</p>
        <div>
          <div className="bg-gray-500"></div>
        </div>
        <div>
          <div className="bg-gray-500"></div>
        </div>
        <div>
          <div className="bg-gray-500"></div>
        </div>
        <div>
          <div className="bg-gray-500"></div>
        </div>
        <div>
          <div className="bg-gray-500"></div>
        </div>
        <div>
          <div className="bg-gray-500"></div>
        </div>
        <div>
          <div className="bg-gray-500"></div>
        </div>
      </div>
      <div>
        <div>
          <div className="bg-gray-500"></div>
          <p className="bg-gray-500 text-sm">0</p>
        </div>
        <div>
          <div className="bg-gray-500"></div>
          <p className="bg-gray-500 text-sm">10</p>
        </div>
        <div>
          <div className="bg-gray-500"></div>
          <p className="bg-gray-500 text-sm">100</p>
        </div>
        <div>
          <div className="bg-gray-500"></div>
          <p className="bg-gray-500 text-sm">500</p>
        </div>
        <div>
          <div className="bg-gray-500"></div>
          <p className="bg-gray-500 text-sm">1000</p>
        </div>
      </div>
      <div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div className="bg-gray-500 w-24 h-24"></div>
      <div className="bg-blue-500 w-24 h-24"></div>
      <p className="bg-gray-500 text-sm">Download App</p>
      <div className="bg-gray-100 w-24 h-24"></div>
    </div>
  )
}

export default DashboardMetrics