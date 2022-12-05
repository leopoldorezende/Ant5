 import {
    Routes,
    Route
} from 'react-router-dom'

import Producao from './pages/Producao/index'
import GeracaoAcabados from './pages/GeracaoAcabados/'
import PrevisaoVendas from './pages/PrevisaoVendas/'

export function AppRoutes() { 
    return (
        <Routes>
            <Route path="/" element={<Producao />} />
            <Route path="/Producao" element={<Producao />} />
            <Route path="/GeracaoAcabados" element={<GeracaoAcabados />} />
            <Route path="/PrevisaoVendas" element={<PrevisaoVendas />} />
        </Routes>
    )
}
