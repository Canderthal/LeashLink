import { Route, Routes } from "react-router-dom";
import './App.css';
import { useState, useEffect } from "react";
import Header from "./components/Header";
import LoginMenu from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useDispatch } from "react-redux";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer";
import CheckoutPage from "./pages/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe('pk_test_51DAQIICr4ItxqkhcoMClnf6Mo5Mkn8x0KxvCmC3fawfdS4gtU0lABFs6PDsucHFacD9JdOBi7Klkbje92crxYB9K008Lgfqk59');

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
    <Elements stripe={stripePromise} >
      <div className="app-background">
        <Header user={user}/>
          <Routes>
            <Route path='/' element={<LoginMenu onUserLogin={handleUserLogin} onUserLogout={handleUserLogout} user={user} />}/>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='admin' element={<AdminDashboard />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='user' element={<LoginMenu />} />
            <Route path='checkout' element={<CheckoutPage />} />
          </Routes>
          <Footer />
      </div>
    </Elements>
  );
}

export default App;




        {/* Old Routes to possibly review later */}

        {/* <Route path='fido' element={<FidoPage />} />
        <Route path="overview" element={<CheckInPage />} />
        <Route path='test' element={<FidoPage />} /> */}
        {/* <Route path='clientInfo' element={<ClientDetails />} /> */}