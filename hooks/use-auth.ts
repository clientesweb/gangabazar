import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getSession, getCurrentUser } from '@/lib/services/auth'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push('/admin/login')
          return
        }
        setUser(currentUser)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Auth failed'))
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  return { user, loading, error }
}

export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession()
        setIsAuthenticated(!!session)
      } catch {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  return { isAuthenticated, isLoading }
}
