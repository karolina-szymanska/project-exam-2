import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ListOfVenuesPage from "./Pages/ListOfVenuesPage";
import AboutPage from "./Pages/AboutPage";
import Layout from "./components/Layout";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/LoginPage";
import NotFoundPage from "./Pages/NotFoundPage";
import VenueDetailsPage from "./Pages/VenueDetailsPage";
import RegisterPage from "./Pages/RegisterPage";
import VenueImages from "./Pages/VenueDetailsPage/ImageCarousel";
import VenueBookingPage from "./Pages/VenueBookingsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="listings" element={<ListOfVenuesPage />} />
          <Route path="venue/:id" element={<VenueDetailsPage />} />
          <Route path="venue/images/:id" element={<VenueImages />} />
          <Route path="venue/bookings/:id" element={<VenueBookingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
