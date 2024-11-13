import { Routes, Route } from 'react-router-dom'
import CardapioPage from '../pages/CardapioPage'
import Carrinho from '../pages/Carrinho'
import NotFound from '../pages/NotFound'

export default function Router() {
    return (
      <Routes>
        <Route path="/" element={<CardapioPage />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }