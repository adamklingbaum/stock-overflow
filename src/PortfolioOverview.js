import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import PortfolioSummary from './PortfolioSummary';
import PortfolioPerformance from './PortfolioPerformance';

export default function PortfolioOverview() {
  let params = useParams();

  return (
    <div className="my-3">
      <div className="my-3">
        <h3>Portfolio {params.id} overview</h3>
      </div>
      <div className="my-4">
        <Row>
          <Col xs={8}>
            <PortfolioPerformance />
          </Col>
          <Col xs={4} className="border rounded bg-light shadow-sm">
            <PortfolioSummary />
          </Col>
        </Row>
      </div>
    </div>
  );
}
