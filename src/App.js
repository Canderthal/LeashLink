import { Route, Routes } from "react-router-dom";
import './App.css';
import { Container, Col, Row } from 'reactstrap';
import Header from "./components/Header";
import CheckInPage from "./CheckInPage";

//temp import
import FidoPage from './pages/FidoPage';

function App() {
  return (
    <div className="app-background">
      <Header />
      <Routes>
        <Route path='fido' element={<FidoPage />} />
        <Route path="/homepage" element={<CheckInPage />} />
      </Routes>
    </div>
  );
}

export default App;
