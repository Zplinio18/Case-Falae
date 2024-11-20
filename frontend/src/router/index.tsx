import { Routes, Route } from 'react-router-dom'
import CardapioPage from '../pages/CardapioPage'
import Carrinho from '../pages/Carrinho'
import NotFound from '../pages/NotFound'
import Pedidos from '../pages/Pedidos'
import Admin from '../pages/Admin'

export default function Router() {
    return (
      <Routes>
        <Route path="/" element={<CardapioPage />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }