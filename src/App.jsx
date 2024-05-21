import { Route, Routes } from 'react-router-dom';
import Navbar from '/src/assets/components/Navbar/Navbar';
import Login from '/src/assets/components/Pages/Login/Login';
import ProtectedRoute from '/src/ProtectedRoute';
import Home from '/src/assets/components/Pages/Home/Home';
import Profil from '/src/assets/components/Pages/Profil/Profil';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes location={location}>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/Profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;

