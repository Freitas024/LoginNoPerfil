import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Perfil from './Perfil';

export default function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/perfil" element={<Perfil/>}/>
      </Routes>
    </Router>
  );
}
