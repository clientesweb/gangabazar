'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signInAdmin } from '@/lib/services/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signInAdmin(email, password)
      router.push('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al ingresar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: '#FAF7F2' }}
    >
      <Card
        className="w-full max-w-md border-2"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E0D8CC',
        }}
      >
        {/* Logo */}
        <div className="flex justify-center pt-6 pb-2">
          <Image
            src="/images/logo-ganga-bazar.webp"
            alt="Ganga Bazar"
            width={180}
            height={60}
            className="h-14 w-auto"
            priority
          />
        </div>

        <CardHeader>
          <CardTitle style={{ color: '#1A1A1A' }}>Panel Administrativo</CardTitle>
          <CardDescription style={{ color: '#6B6155' }}>
            Ingresa para gestionar los productos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium" style={{ color: '#1A1A1A' }}>
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                style={{
                  backgroundColor: '#F0EBE3',
                  borderColor: '#E0D8CC',
                  color: '#1A1A1A',
                }}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium" style={{ color: '#1A1A1A' }}>
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                style={{
                  backgroundColor: '#F0EBE3',
                  borderColor: '#E0D8CC',
                  color: '#1A1A1A',
                }}
              />
            </div>

            <Button
              type="submit"
              className="w-full text-white"
              disabled={loading}
              style={{ backgroundColor: '#C8AD7F' }}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </form>

          <div className="mt-4 text-xs text-center" style={{ color: '#6B6155' }}>
            <p>Contacta al administrador si no tienes credenciales</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
