import { AuthProvider } from './AuthContext'
import { WindowWidthProvider } from './WindowWidthContext'

export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <WindowWidthProvider>
        {children}
      </WindowWidthProvider>
    </AuthProvider>
  )
}