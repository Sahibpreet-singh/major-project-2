import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error('[API Error]', err?.response?.data || err.message)
    return Promise.reject(err?.response?.data || err)
  }
)

// Jobs
export const getJobs = (params = {}) => api.get('/jobs', { params })
export const saveJobs = () => api.post('/jobs/save')

// Analytics
export const getOverview = () => api.get('/analytics/overview')
export const getTopSkills = () => api.get('/analytics/top-skills')
export const getTopCompanies = () => api.get('/analytics/top-companies')
export const getTopCategories = () => api.get('/analytics/top-categories')
export const getTopLocations = () => api.get('/analytics/top-locations')
export const getJobTypes = () => api.get('/analytics/job-types')
export const getSalaryOverview = () => api.get('/analytics/salary-overview')

export default api
