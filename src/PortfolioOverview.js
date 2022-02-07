import { Row, Col } from 'react-bootstrap';

import PortfolioSummary from './PortfolioSummary';
import PortfolioPerformance from './PortfolioPerformance';

export default function PortfolioOverview({ portfolio }) {
  return (
    <div className="my-3">
      <div className="my-4">
        <Row>
          <Col xs={8}>
            <PortfolioPerformance portfolio={portfolio} />
          </Col>
          <Col xs={4} className="border rounded bg-light shadow-sm">
            <PortfolioSummary portfolio={portfolio} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
