import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Portfolio from './Portfolio';
import PortfolioOverview from './PortfolioOverview';
import PortfolioHoldings from './PortfolioHoldings';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { Container } from 'react-bootstrap';
// import PortfolioHome from './PortfolioHome';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="portfolio/:id/*" element={<Portfolio />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;
