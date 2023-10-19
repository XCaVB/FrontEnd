import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {HorariosPage} from './pages/HorariosPage'
import { HorariosFormPage } from './pages/HorariosFormPage';
import { Administrativos } from './components/Administrativos';
import { Docentes } from './components/Docentes';
import { Home } from './components/Home';
import { RegistrarDisponible } from './components/registrarDisponible';
import { BuscarProfesor } from './components/Header+buscarProfesor';
import { ProfesorHeader } from './components/Header+ProfesorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Docentes" element={<Docentes />} />
        <Route path="/Docentes/:id" element={<RegistrarDisponible/>} />
        <Route path="/Administrativos" element={<Administrativos />} />
        <Route path="/Administrativos/buscar-profesor" element={<BuscarProfesor />} />
        <Route path="/Administrativos/buscar-profesor/:id" element={<ProfesorHeader />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;