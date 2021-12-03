import { Routes, Route, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
export default function PortfolioOverview() {
  let params = useParams();
  return (
    <div className="my-3">
      <div className="my-3">
        <h2>Portfolio {params.id} overview</h2>
      </div>
      <div className="my-4">
        <Row>
          <Col xs={8}>Left</Col>
          <Col xs={4} className="border-start">
            Right
          </Col>
        </Row>
      </div>
    </div>
  );
}
