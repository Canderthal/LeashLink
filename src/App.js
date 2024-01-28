import { Route, Routes } from "react-router-dom";
import './App.css';
import { useState, useEffect } from "react";
import Header from "./components/Header";
import LoginMenu from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";


// Old imports to review later
// import CheckInPage from "./OldFiles/CheckInPage";
// import ClientDetails from "./pages/ClientDetailPage";
//import FidoPage from './pages/FidoPage';

function App() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState((storedUser || null));

  const handleUserLogin = (loggedInUser) => {
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  }

  const handleUserLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <div className="app-background">
      <Header user={user}/>
        <Routes>
          <Route path='/' element={<LoginMenu onUserLogin={handleUserLogin} onUserLogout={handleUserLogout} />}/>
          <Route path='dashboard' element={<Dashboard />} />


        {/* Old Routes to possibly review later */}

        {/* <Route path='fido' element={<FidoPage />} />
        <Route path="overview" element={<CheckInPage />} />
        <Route path='test' element={<FidoPage />} /> */}
        {/* <Route path='clientInfo' element={<ClientDetails />} /> */}


      </Routes>
    </div>
  );
}

export default App;
