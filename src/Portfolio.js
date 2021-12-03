import { Routes, Route, useParams } from 'react-router-dom';
import PortfolioOverview from './PortfolioOverview';
import PortfolioHoldings from './PortfolioHoldings';

export default function Portfolio() {
  let params = useParams();
  return (
    <div>
      <h1>Portfolio {params.id}</h1>
      <Routes>
        <Route index element={<PortfolioOverview />} />
        <Route path="overview" element={<PortfolioOverview />} />
        <Route path="holdings" element={<PortfolioHoldings />} />
      </Routes>
    </div>
  );
}
