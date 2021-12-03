import { Nav } from 'react-bootstrap';
import { Routes, Route, useParams, Link } from 'react-router-dom';
import PortfolioOverview from './PortfolioOverview';
import PortfolioHoldings from './PortfolioHoldings';

export default function Portfolio() {
  let params = useParams();
  return (
    <div>
      <h1>Portfolio {params.id}</h1>
      <Nav variant="tabs" defaultActiveKey="overview">
        <Nav.Item>
          <Nav.Link eventKey="overview">
            <Link to="overview" style={{ textDecoration: 'none' }}>
              Overview
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="holdings">
            <Link to="holdings" style={{ textDecoration: 'none' }}>
              Holdings
            </Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route index element={<PortfolioOverview />} />
        <Route path="overview" element={<PortfolioOverview />} />
        <Route path="holdings" element={<PortfolioHoldings />} />
      </Routes>
    </div>
  );
}
