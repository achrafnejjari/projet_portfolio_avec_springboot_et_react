import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PortfolioSelection from './pages/PortfolioSelection';
import PortfolioPage from './pages/PortfolioPage';
import PortfolioSummary from "./pages/PortfolioSummary";
import BasicPortfolioPage from "./pages/BasicPortfolioPage";
import CreativePortfolioPage from "./pages/CreativePortfolioPage";
import ProfessionalPortfolioPage from "./pages/ProfessionalPortfolioPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'animate.css';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/portfolio-selection" element={<PortfolioSelection />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/portfolio-summary" element={<PortfolioSummary />} />
                    <Route path="/portfolio/basic" element={<BasicPortfolioPage />} />
                    <Route path="/portfolio/professional" element={<ProfessionalPortfolioPage />} />
                    <Route path="/portfolio/creative" element={<CreativePortfolioPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;