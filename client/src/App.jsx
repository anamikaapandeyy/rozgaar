import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import CareerDetail from './pages/CareerDetail';
import Browse from './pages/Browse';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/career/:slug" element={<CareerDetail />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}