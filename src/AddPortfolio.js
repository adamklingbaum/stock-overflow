import { Button, Modal, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddPortfolio() {
  const [show, setShow] = useState(false);
  const [tradeFields, setTradeFields] = useState(3);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: null,
    date: null,
    cash: null,
    transactions: {
      0: { type: 'buy' },
      1: { type: 'buy' },
      2: { type: 'buy' },
    },
  });

  const handleChange = (event) => {
    let newFormData = { ...formData };
    newFormData[event.target.name] = event.target.value;
    console.log(newFormData);
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const portfolioId = 4; // mock data would be the id returned by the api
    navigate(`/portfolio/${portfolioId}/overview`);
  };

  const addTradeField = () => {
    const newTradeFields = tradeFields + 1;
    setTradeFields(newTradeFields);
    const newFormData = { ...formData };
    newFormData.transactions[tradeFields] = {};
  };

  const updateTransactionType = (event) => {
    const newFormData = { ...formData };
    newFormData.transactions[event.target.name].type = event.target.value;
    console.log(newFormData);
    setFormData(newFormData);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add portfolio
      </Button>

      <Form onSubmit={handleSubmit}>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{formData.name || 'New portfolio'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="addPortfolio.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                name="name"
                onChange={handleChange}
                placeholder="Enter portfolio name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addPortfolio.date">
              <Form.Label>Date of inception</Form.Label>
              <Form.Control
                type="date"
                value={formData.date}
                name="date"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Label htmlFor="addPortfolio.cash">
              Starting cash balance
            </Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                id="addPortfolio.cash"
                name="cash"
                min="0.01"
                step="0.01"
                size="sm"
                value={formData.price}
                onChange={handleChange}
                placeholder="10,000.00"
              />
            </InputGroup>
            <Form.Label>Transactions</Form.Label>
            {[...Array(tradeFields).keys()].map((field) => (
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Control placeholder="Name" />
                  </Form.Group>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>#</InputGroup.Text>
                    <Form.Control placeholder="Shares" />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup classname="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control type="number" placeholder="Avg. price" />
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Check
                      inline
                      type="radio"
                      value="buy"
                      label="Buy"
                      name={field}
                      onChange={updateTransactionType}
                      checked={formData.transactions[field]?.type === 'buy'}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      value="sell"
                      label="Sell"
                      name={field}
                      onChange={updateTransactionType}
                      checked={formData.transactions[field]?.type === 'sell'}
                    />
                  </Form.Group>
                </Col>
              </Row>
            ))}
            <Button type="button" variant="secondary" onClick={addTradeField}>
              Add trade
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
}
