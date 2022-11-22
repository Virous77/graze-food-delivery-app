import "./App.css";
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  ErrorPage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  SearchPage,
  CartPage,
  OffersPage,
  AdminPage,
  HotelHomePage,
} from "./pages/index";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "./store/authContext";
import MobileNavbar from "./components/layout/MobileNavbar";

function App() {
  const [showMobile, setShowMobile] = useState(false);
  const { user } = useAuthContext();

  return (
    <section className="App">
      <Navbar setShowMobile={setShowMobile} />
      {showMobile && <MobileNavbar setShowMobile={setShowMobile} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:name/:id" element={<HotelHomePage />} />

        {user.email === process.env.REACT_APP_ADMIN_ID && (
          <Route path="/admin/*" element={<AdminPage />} />
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </section>
  );
}

export default App;
