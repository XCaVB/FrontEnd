import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Administrativos } from './components/Pages/Principal/Administrativos';
import { Docentes } from './components/Pages/Principal/Docentes';
import { Home } from './components/Pages/Principal/Home';
import { Usuarios } from './components/Pages/Usuarios/Usuarios';
import { RegistrarDisponible } from './components/Pages/HorarioProfe/registrarDisponible';
import { BuscarProfesor } from './components/Routes/Header+buscarProfesor';
import { ProfesorHeader } from './components/Routes/Header+ProfesorPage';
import { EdicionHeader } from './components/Routes/Header+edicionHoraria';

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
        <Route path="/Administrativos/buscar-profesor/:id/editar-horario" element={<EdicionHeader />} />
        <Route path="/bd-management" element={<Usuarios />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;