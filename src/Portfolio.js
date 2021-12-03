import { Nav } from 'react-bootstrap';
import { Routes, Route, useParams, Link, useLocation } from 'react-router-dom';
import PortfolioOverview from './PortfolioOverview';
import PortfolioHoldings from './PortfolioHoldings';

export default function Portfolio() {
  let params = useParams();
  let pathname = useLocation().pathname.split('/').pop();
  console.log(pathname);
  return (
    <div className="my-3">
      <div className="my-3">
        <h2>Portfolio {params.id}</h2>
      </div>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link active={pathname === 'overview'}>
            <Link to="overview" style={{ textDecoration: 'none' }}>
              Overview
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={pathname === 'holdings'}>
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
