import { Button, Modal, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sp500 } from './sp500';

export default function AddPortfolio() {
  const [show, setShow] = useState(false);
  const [tradeFields, setTradeFields] = useState(3);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    cash: '',
    transactions: {
      0: { name: '', shares: 1, price: 0.01, type: 'buy' },
      1: { name: '', shares: 1, price: 0.01, type: 'buy' },
      2: { name: '', shares: 1, price: 0.01, type: 'buy' },
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
    console.log('yes');
  };

  const addTradeField = () => {
    const newFormData = { ...formData };
    newFormData.transactions[tradeFields] = {
      name: '',
      shares: 1,
      price: 0.01,
      type: 'buy',
    };
    setFormData(newFormData);
    const newTradeFields = tradeFields + 1;
    setTradeFields(newTradeFields);
  };

  const updateTransaction = (event, key) => {
    const newFormData = { ...formData };
    console.log(event.target.name, key);
    newFormData.transactions[event.target.name][key] = event.target.value;
    console.log(newFormData);
    setFormData(newFormData);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add portfolio
      </Button>

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
          <Form onSubmit={handleSubmit}>
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
                  <Form.Group className="mb-3" controlId="addPortfolio.name">
                    <Form.Control
                      size="sm"
                      name={field}
                      list="sp500DataList"
                      placeholder="Name or symbol"
                      value={formData.transactions[field].name}
                      onChange={(e) => {
                        updateTransaction(e, 'name');
                      }}
                    />
                    <datalist id="sp500DataList">
                      {sp500.map((co) => (
                        <option value={co.Symbol} label={co.Name} />
                      ))}
                    </datalist>
                  </Form.Group>
                  {/*  <Form.Group className="mb-3">
                    <Form.Control
                      placeholder="Name"
                      name={field}
                      value={formData.transactions[field].name}
                      onChange={(e) => {
                        updateTransaction(e, 'name');
                      }}
                    />
                  </Form.Group> */}
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>#</InputGroup.Text>
                    <Form.Control
                      placeholder="Shares"
                      type="number"
                      name={field}
                      value={formData.transactions[field].shares}
                      onChange={(e) => {
                        updateTransaction(e, 'shares');
                      }}
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      type="number"
                      min="0.01"
                      step="0.01"
                      name={field}
                      placeholder="Avg. price"
                      value={formData.transactions[field].price}
                      onChange={(e) => {
                        updateTransaction(e, 'price');
                      }}
                    />
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
                      onChange={(e) => {
                        updateTransaction(e, 'type');
                      }}
                      checked={formData.transactions[field]?.type === 'buy'}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      value="sell"
                      label="Sell"
                      name={field}
                      onChange={(e) => {
                        updateTransaction(e, 'type');
                      }}
                      checked={formData.transactions[field]?.type === 'sell'}
                    />
                  </Form.Group>
                </Col>
              </Row>
            ))}
            <div className="mb-3">
              <Button type="button" variant="secondary" onClick={addTradeField}>
                Add trade
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{ display: 'none' }}
                id="btnSubmitPortfolio"
              >
                Create
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            onClick={() =>
              document.getElementById('btnSubmitPortfolio').click()
            }
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
