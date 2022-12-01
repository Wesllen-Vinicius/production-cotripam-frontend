import { BrowserRouter } from 'react-router-dom'
import LayoutWrapper from './components/LayoutWrapper'
import Rotas from './routes'
import { AuthProvider } from './pages/context/AuthContext'
import { ThemeProvider } from './pages/context/ThemeContext'
import { ProtectedRoute } from './routes/protectedRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <LayoutWrapper>
            <ProtectedRoute>
              <Rotas />
            </ProtectedRoute>
          </LayoutWrapper>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
