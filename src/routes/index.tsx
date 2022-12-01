import { Routes, Route } from 'react-router-dom'
import Home from '../pages'
import FourZeroFour from '../pages/404'
import { Login } from '../pages/login'
import { DashBoardEncarregado } from '../pages/modules/encarregado/dashboardEncarregado'
import { DashBoardGerencia } from '../pages/modules/Gerencia/DashboardGerencia'
import { ProtectedRoute } from './protectedRoute'

const Rotas: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route
      path="encarregado"
      element={
        <ProtectedRoute>
          <DashBoardEncarregado />
        </ProtectedRoute>
      }
    />
    <Route path="gerencia" element={<DashBoardGerencia />} />
    <Route path="/*" element={<FourZeroFour />} />
  </Routes>
)
export default Rotas
