'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCSVData } from '../store/slice/dataSlice'
import Dashboard from '../components/Dashboard'
import Header from '../components/Headers'

export default function HomePage() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.data)

  useEffect(() => {
    // Load initial data when app starts
    dispatch(fetchCSVData())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Dashboard />
      </main>
    </div>
  )
}