import { createContext, useContext, useMemo, useState } from 'react'
import { ADMIN_CREDENTIALS, hashPassword } from '../utils/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [authError, setAuthError] = useState('')

  const login = (username, password) => {
    const hashedInput = hashPassword(password)
    const validUser = username.trim().toLowerCase() === ADMIN_CREDENTIALS.username
    const validPassword = hashedInput === ADMIN_CREDENTIALS.passwordHash

    if (validUser && validPassword) {
      setIsAdmin(true)
      setAuthError('')
      return true
    }

    setIsAdmin(false)
    setAuthError('Credenciales invalidas. Verifica e intenta nuevamente.')
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    setAuthError('')
  }

  const value = useMemo(
    () => ({
      isAdmin,
      authError,
      login,
      logout,
    }),
    [authError, isAdmin],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return context
}
