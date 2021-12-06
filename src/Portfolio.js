import { Nav } from 'react-bootstrap';
import { Routes, Route, useParams, Link, useLocation } from 'react-router-dom';
import PortfolioOverview from './PortfolioOverview';
import PortfolioHoldings from './PortfolioHoldings';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Portfolio() {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState({});
  const pathname = useLocation().pathname.split('/').pop();

  useEffect(() => {
    axios.get(`/portfolios/${id}`).then(({ data }) => {
      console.log(data);
      setPortfolio(data);
    });
  }, [id]);

  return (
    <div className="my-3">
      <div className="mt-3 mb-5">
        <small className="text-muted">My portfolios</small>
        <h2>{portfolio.name}</h2>
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
        <Route
          path="overview"
          element={<PortfolioOverview portfolio={portfolio} />}
        />
        <Route
          path="holdings"
          element={<PortfolioHoldings portfolio={portfolio} />}
        />
      </Routes>
    </div>
  );
}
