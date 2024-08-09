import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Panel from './pages/Panel';
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <h1>ENTRENA VIRTUAL</h1>
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="/" element={<p>Bienvenido</p>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
