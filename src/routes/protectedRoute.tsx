import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../pages/context/AuthContext'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const storagedToken = localStorage.getItem('@App:token')
  useEffect(() => {
    if (!storagedToken) {
      navigate('/')
    } else if (auth.user?.nivel === true) {
      navigate('/gerencia')
    } else {
      navigate('/encarregado')
    }
  }, [storagedToken])
  return children
}
