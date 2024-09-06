import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ListOfVenuesPage from "./Pages/ListOfVenuesPage";
import AboutPage from "./Pages/AboutPage";
import Layout from "./components/Layout";
import VenueDetailsPage from "./Pages/VenueDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="listings" element={<ListOfVenuesPage />} />
          <Route path="venue/:id" element={<VenueDetailsPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
