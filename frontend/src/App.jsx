import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Daftar from './pages/Daftar'
import CekBerkas from './pages/CekBerkas'
import Estimasi from './pages/Estimasi'
import PlaceholderPage from './pages/PlaceholderPage'
import ProfilKBIHU from './pages/ProfilKBIHU'
import MediaSosial from './pages/MediaSosial'
import Dokumentasi from './pages/Dokumentasi'
import DashboardJamaah from './pages/DashboardJamaah'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardJamaah />} />
          <Route path="/cek-berkas" element={<CekBerkas />} />
          <Route path="/estimasi" element={<Estimasi />} />
          <Route path="/bantuan" element={<PlaceholderPage title="Pusat Bantuan" />} />
          <Route path="/profil" element={<ProfilKBIHU />} />
          <Route path="/dokumentasi" element={<Dokumentasi />} />
          <Route path="/kegiatan" element={<PlaceholderPage title="Kegiatan Jemaah" />} />
          <Route path="/materi" element={<PlaceholderPage title="Materi Manasik" />} />
          <Route path="/sosmed" element={<MediaSosial />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
