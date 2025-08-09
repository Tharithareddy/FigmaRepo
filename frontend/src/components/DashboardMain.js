'use client'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { Search, Download, Upload, RefreshCw } from 'lucide-react'

const DashboardMain = () => {
  const dispatch = useDispatch()
  const { csvData, filteredData, loading, error } = useSelector(state => state.data)
  const [localState, setLocalState] = useState({})
  
  useEffect(() => {
    // Initialize component
  }, [])
  
  return (
    <div>
      <div className="bg-gray-500 rounded-2xl w-full h-48">
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-100"></div>
        <div>
          <div>
            <div className="bg-gray-100"></div>
          </div>
          <div>
            <div className="bg-gray-500"></div>
          </div>
          <div>
            <div className="bg-gray-100"></div>
          </div>
          <div>
            <div className="bg-gray-500"></div>
          </div>
          <div>
            <div className="bg-gray-100"></div>
          </div>
          <div>
            <div className="bg-gray-100"></div>
          </div>
          <div className="bg-red-500"></div>
          <div className="bg-red-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-red-500"></div>
          <div className="bg-gray-100"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="rounded-lg">
            <div className="rounded-lg">
              <div className="bg-gray-500 rounded-lg"></div>
            </div>
          </div>
          <div className="bg-gray-500"></div>
          <div className="bg-red-500"></div>
          <div className="bg-gray-100"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-red-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-100"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-100"></div>
          <div className="bg-gray-100"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
        </div>
        <div className="flex flex-col items-center w-24 h-48">
          <h2 className="bg-gray-100 text-5xl">1</h2>
          <h2 className="bg-gray-100 text-2xl">Days</h2>
        </div>
        <div className="flex flex-col items-center w-24 h-48">
          <h2 className="bg-gray-100 text-5xl">1</h2>
          <h2 className="bg-gray-100 text-2xl">Hours</h2>
        </div>
        <div className="flex flex-col items-center w-96 h-48">
          <h2 className="bg-gray-100 text-5xl">0000001</h2>
          <h2 className="bg-gray-100 text-2xl">Users</h2>
        </div>
      </div>
      <div className="flex items-center gap-11 w-full h-24">
        <div className="flex justify-center items-center gap-3 p-3 w-full h-24">
          <h2 className="bg-gray-900 text-3xl font-semibold">Overview       Daily |  Weekly |  Monthly | Yearly and Till Date</h2>
        </div>
      </div>
      <div className="flex items-center gap-11 w-96 h-24">
        <div className="flex justify-center items-center gap-3 p-3 w-96 h-24">
          <p className="bg-gray-500 text-sm font-semibold">Overview</p>
          <p className="bg-gray-900 text-sm">Traffic Info and Date</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 p-3 w-full h-24">
        <p className="bg-gray-900 text-xl font-semibold">Users and their Feedbacks and Tickets </p>
      </div>
      <div>
        <div className="bg-gray-100 rounded-2xl w-96 h-48"></div>
        <p className="bg-gray-900 text-sm">New Users</p>
        <h2 className="bg-gray-900 text-2xl font-medium">100</h2>
        <p className="bg-gray-900 text-sm">+15.03%</p>
        <div className="bg-gray-900"></div>
      </div>
      <div>
        <div className="bg-gray-100 rounded-2xl w-96 h-48"></div>
        <p className="bg-gray-900 text-sm">Active Users</p>
        <h2 className="bg-gray-900 text-2xl font-medium">3,318</h2>
        <p className="bg-gray-900 text-sm">+6.03%</p>
        <div className="bg-gray-900"></div>
      </div>
      <div>
        <div className="bg-gray-100 rounded-2xl w-96 h-48"></div>
        <p className="bg-gray-900 text-sm">Total Profiles</p>
        <h2 className="bg-gray-900 text-2xl font-medium">3,318</h2>
        <p className="bg-gray-900 text-sm">+6.03%</p>
        <div className="bg-gray-900"></div>
      </div>
      <div>
        <div className="bg-gray-100 rounded-2xl w-full"></div>
        <p className="bg-gray-900 text-sm">User Create Portfolio Types</p>
        <div>
          <div className="bg-gray-500"></div>
        </div>
        <div>
          <div className="bg-blue-500"></div>
          <div className="bg-gray-100"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-gray-500"></div>
          <div className="bg-blue-500"></div>
          <div className="bg-blue-500"></div>
        </div>
        <div className="flex flex-col items-center w-24 h-24">
          <p className="bg-gray-900 text-sm">Total Portfolio Users</p>
          <h2 className="bg-gray-900 text-2xl font-semibold">50,000</h2>
        </div>
        <div className="flex flex-col gap-4 w-48 h-96">
          <div className="flex items-center gap-20 w-48 h-24">
            <div className="flex items-center gap-1 w-48 h-24">
              <div className="bg-blue-500"></div>
              <p className="bg-gray-500 text-sm font-medium">Personal</p>
            </div>
            <p className="bg-gray-900 text-sm">Users</p>
          </div>
          <div className="flex items-center gap-20 w-48 h-24">
            <div className="flex items-center gap-1 w-48 h-24">
              <div className="bg-blue-500"></div>
              <p className="bg-gray-500 text-sm font-medium">Academic</p>
            </div>
            <p className="bg-gray-900 text-sm">Users</p>
          </div>
          <div className="flex items-center gap-20 w-48 h-24">
            <div className="flex items-center gap-1 w-48 h-24">
              <div className="bg-blue-500"></div>
              <p className="bg-gray-500 text-sm font-medium">Corporate</p>
            </div>
            <p className="bg-gray-900 text-sm">Users</p>
          </div>
          <div className="flex items-center gap-20 w-48 h-24">
            <div className="flex items-center gap-1 w-24 h-24">
              <div className="bg-gray-500"></div>
              <p className="bg-gray-500 text-sm font-medium">Business</p>
            </div>
            <p className="bg-gray-900 text-sm">Users</p>
          </div>
          <div className="flex items-center gap-20 w-48 h-24">
            <div className="flex items-center gap-1 w-48 h-24">
              <div className="bg-gray-500"></div>
              <p className="bg-gray-500 text-sm font-medium">Matrimonial</p>
            </div>
            <p className="bg-gray-900 text-sm">Users</p>
          </div>
          <div className="flex items-center gap-20 w-48 h-24">
            <div className="flex items-center gap-1 w-24 h-24">
              <div className="bg-gray-500"></div>
              <p className="bg-gray-500 text-sm font-medium">Creative</p>
            </div>
            <p className="bg-gray-900 text-sm">Users</p>
          </div>
          <div className="flex items-center gap-20 w-48 h-24">
            <div className="flex items-center gap-1 w-24 h-24">
              <div className="bg-gray-500"></div>
              <p className="bg-gray-500 text-sm font-medium">Volunteer</p>
            </div>
            <p className="bg-gray-900 text-sm">Users</p>
          </div>
          <div className="flex items-center gap-20 w-48 h-24">
            <div className="flex items-center gap-1 w-24 h-24">
              <div className="bg-gray-500"></div>
              <p className="bg-gray-500 text-sm font-medium">Lifestyle</p>
            </div>
            <p className="bg-gray-900 text-sm">Users</p>
          </div>
          <div className="flex items-center gap-20 w-48 h-24">
            <div className="flex items-center gap-1 w-24 h-24">
              <div className="bg-gray-100"></div>
              <p className="bg-gray-500 text-sm font-medium">Professional</p>
            </div>
            <p className="bg-gray-900 text-sm">Users</p>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-gray-100 rounded-2xl w-full"></div>
        <div className="flex flex-col items-center gap-4 w-full h-48">
          <div className="flex gap-9 p-7 w-full h-48">
            <div className="flex gap-8 w-96 h-24">
              <div className="bg-gray-100 rounded-lg w-24 h-24"></div>
              <div className="bg-gray-100 rounded-lg w-24 h-24"></div>
              <div className="bg-gray-100 rounded-lg w-24 h-24"></div>
              <div className="bg-gray-500 rounded-lg w-24 h-24"></div>
            </div>
            <div className="flex flex-col gap-1 w-24 h-24">
              <div className="flex justify-center items-center gap-3 p-1 bg-gray-100 rounded w-24 h-24">
                <p className="bg-gray-900 text-sm">400</p>
              </div>
              <div className="bg-gray-500 rounded w-24 h-24"></div>
            </div>
            <div className="bg-gray-500 rounded-lg w-24 h-24"></div>
          </div>
          <div className="flex gap--5 w-full h-24">
            <div className="flex w-96 h-24">
              <p className="bg-gray-500 text-sm font-medium">US</p>
              <p className="bg-gray-500 text-sm font-medium">Canada</p>
              <p className="bg-gray-500 text-sm font-medium">Japan</p>
            </div>
            <div className="flex w-96 h-24">
              <p className="bg-gray-500 text-sm font-medium">Mexico</p>
              <p className="bg-gray-500 text-sm font-medium">Australia </p>
              <p className="bg-gray-500 text-sm font-medium">India</p>
            </div>
          </div>
        </div>
        <p className="bg-gray-900 text-sm">Traffic Location  </p>
        <p className="bg-gray-500 text-sm">View More Report</p>
      </div>
      <p className="bg-gray-900 text-xl font-semibold">User data</p>
      <div>
        <div>
          <p className="bg-gray-900 text-base">Select Time Period</p>
          <div>
            <div className="bg-gray-100 rounded-xl w-96 h-24"></div>
            <div></div>
            <p className="bg-gray-500 text-sm">19 January 2025</p>
          </div>
        </div>
        <div>
          <p className="bg-gray-900 text-base">Select User type</p>
          <div>
            <div className="bg-gray-100 rounded-xl w-96 h-24"></div>
            <div></div>
            <p className="bg-gray-500 text-sm">All User Data</p>
          </div>
        </div>
        <div className="rounded-xl">
          <p className="bg-gray-900 text-base">Group By</p>
          <div className="rounded-xl">
            <div className="bg-gray-100 rounded-xl w-24 h-24"></div>
            <p className="bg-gray-500 text-sm">Day</p>
          </div>
          <div className="rounded-xl">
            <div className="bg-gray-100 rounded-xl w-24 h-24"></div>
            <p className="bg-gray-500 text-sm">Week</p>
          </div>
          <div className="rounded-xl">
            <div className="bg-gray-100 rounded-xl w-24 h-24"></div>
            <p className="bg-gray-500 text-sm">Month</p>
          </div>
          <div className="rounded-xl">
            <div className="bg-gray-100 rounded-xl w-24 h-24"></div>
            <p className="bg-gray-500 text-sm">Year</p>
          </div>
        </div>
        <div>
          <h2 className="bg-blue-500 text-xl font-semibold">User Engagement</h2>
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
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 p-3 w-full h-24">
        <p className="bg-gray-900 text-xl font-semibold">Marketing                Daily |  Weekly |  Monthly | Yearly and Till Date</p>
      </div>
      <div>
        <div className="bg-gray-100 rounded-2xl w-96 h-48"></div>
        <p className="bg-gray-900 text-sm">Visits Website</p>
        <h2 className="bg-gray-900 text-2xl font-medium">3,671</h2>
        <p className="bg-gray-900 text-sm">-0.03%</p>
        <div className="bg-gray-900"></div>
      </div>
      <div>
        <div className="bg-gray-100 rounded-2xl w-96 h-48"></div>
        <p className="bg-gray-900 text-sm">Download App</p>
        <h2 className="bg-gray-900 text-2xl font-medium">3,671</h2>
        <p className="bg-gray-900 text-sm">-0.03%</p>
        <div className="bg-gray-900"></div>
      </div>
      <div>
        <div className="bg-gray-100 rounded-2xl w-48 h-48"></div>
        <p className="bg-gray-900 text-sm">Visits LinkedIn</p>
        <p className="bg-gray-900 text-sm">Visits LinkedIn</p>
        <h2 className="bg-gray-900 text-2xl font-medium">3,671</h2>
        <p className="bg-gray-900 text-sm">-0.03%</p>
        <div className="bg-gray-900"></div>
      </div>
      <div>
        <div className="bg-gray-100 rounded-2xl w-48 h-48"></div>
        <p className="bg-gray-900 text-sm">Visits Instagram</p>
        <h2 className="bg-gray-900 text-2xl font-medium">3,671</h2>
        <p className="bg-gray-900 text-sm">-0.03%</p>
        <div className="bg-gray-900"></div>
      </div>
      <div className="rounded-2xl">
        <div className="bg-gray-100 rounded-2xl w-48 h-48"></div>
        <p className="bg-gray-900 text-sm">Social Events</p>
        <h2 className="bg-gray-900 text-2xl font-medium">3,671</h2>
      </div>
      <div className="flex justify-center items-center gap-3 p-3 w-96 h-24">
        <p className="bg-gray-900 text-xl font-semibold">Social Media</p>
      </div>
      <div>
        <div>
          <h2 className="bg-blue-500 text-xl font-semibold">Social Media Engagement</h2>
          <div>
            <div className="bg-gray-100 rounded-2xl w-full"></div>
            <div>
              <p className="bg-gray-500 text-sm">Jul</p>
              <p className="bg-gray-500 text-sm">Aug</p>
              <p className="bg-gray-500 text-sm">Sep</p>
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
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div>
                <p className="bg-gray-500 text-sm">Instagram</p>
                <p className="bg-gray-500 text-sm">All</p>
                <p className="bg-gray-500 text-sm">Linkedln</p>
                <div className="bg-gray-500 w-24 h-24"></div>
                <div className="bg-gray-900 w-24 h-24"></div>
                <div className="bg-blue-500 w-24 h-24"></div>
                <p className="bg-gray-500 text-sm">Visit to Website</p>
                <div className="bg-gray-100 w-24 h-24"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="bg-gray-900 text-base">Select Time Period</p>
          <div>
            <div className="bg-gray-100 rounded-xl w-96 h-24"></div>
            <div></div>
            <p className="bg-gray-500 text-sm">19 January 2025</p>
          </div>
        </div>
        <div>
          <p className="bg-gray-900 text-base">Select User type</p>
          <div>
            <div className="bg-gray-100 rounded-xl w-96 h-24"></div>
            <div></div>
            <p className="bg-gray-500 text-sm">All Social Media data</p>
          </div>
        </div>
        <div className="rounded-xl">
          <p className="bg-gray-900 text-base">Group By</p>
          <div className="rounded-xl">
            <div className="bg-gray-100 rounded-xl w-24 h-24"></div>
            <p className="bg-gray-500 text-sm">Day</p>
          </div>
          <div className="rounded-xl">
            <div className="bg-gray-100 rounded-xl w-24 h-24"></div>
            <p className="bg-gray-500 text-sm">Week</p>
          </div>
          <div className="rounded-xl">
            <div className="bg-gray-100 rounded-xl w-24 h-24"></div>
            <p className="bg-gray-500 text-sm">Month</p>
          </div>
          <div className="rounded-xl">
            <div className="bg-gray-100 rounded-xl w-24 h-24"></div>
            <p className="bg-gray-500 text-sm">Year</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardMain