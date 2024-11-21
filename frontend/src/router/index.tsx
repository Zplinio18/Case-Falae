import { Routes, Route } from 'react-router-dom'
import Menu from '../pages/Menu'
import Cart from '../pages/Cart'
import NotFound from '../pages/NotFound'
import Orders from '../pages/Orders'
import Admin from '../pages/Admin'

export default function Router() {
    return (
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/pedidos" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }