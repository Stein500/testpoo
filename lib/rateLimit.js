// Système de rate limiting simple en mémoire
const rateLimitStore = new Map()

export function rateLimit(config) {
  const { interval = 60000, uniqueTokenPerInterval = 500 } = config

  return {
    check: (token, limit) => {
      const now = Date.now()
      const windowStart = now - interval
      
      if (!rateLimitStore.has(token)) {
        rateLimitStore.set(token, [])
      }
      
      const requests = rateLimitStore.get(token).filter(time => time > windowStart)
      rateLimitStore.set(token, requests)
      
      if (requests.length >= limit) {
        return true // Rate limited
      }
      
      requests.push(now)
      return false // Not rate limited
    },
    
    cleanup: () => {
      const now = Date.now()
      const windowStart = now - interval
      
      for (const [token, requests] of rateLimitStore) {
        const filteredRequests = requests.filter(time => time > windowStart)
        if (filteredRequests.length === 0) {
          rateLimitStore.delete(token)
        } else {
          rateLimitStore.set(token, filteredRequests)
        }
      }
    }
  }
}

// Nettoyage périodique
setInterval(() => {
  const limiter = rateLimit({ interval: 60000 })
  limiter.cleanup()
}, 60000)
