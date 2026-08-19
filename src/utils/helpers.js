import { getAllNews } from "./data"

export const findNewsById = (id) => {
  const allNewsItems = getAllNews()
  return allNewsItems.find(item => item.id == id)
}

export const formatNumber = (num) => {
  if (!num) return '0'
  if (typeof num === 'number') {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }
  return num
}

export const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = Math.floor((now - date) / 1000)
  
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`
  
  return date.toLocaleDateString()
}