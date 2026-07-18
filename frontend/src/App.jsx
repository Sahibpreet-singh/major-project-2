import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Analytics from './pages/Analytics'
import JobDetails from './pages/JobDetails'
import AIChat from "./pages/AIChat";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-base">
        <Sidebar />
        <Navbar />
        <main className="ml-56 pt-14 p-6 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/chat" element={<AIChat />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
