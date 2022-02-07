import { Button, Modal, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddPortfolio() {
  const [show, setShow] = useState(false);
  const [universe, setUniverse] = useState([]);
  const [tradeFields, setTradeFields] = useState(3);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/securities').then(({ data }) => {
      setUniverse(data);
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    cash: '',
    transactions: [
      { symbol: '', date: '', shares: '', price: '', type: 'buy' },
      { symbol: '', date: '', shares: '', price: '', type: 'buy' },
      { symbol: '', date: '', shares: '', price: '', type: 'buy' },
    ],
  });

  const handleChange = (event) => {
    let newFormData = { ...formData };
    newFormData[event.target.name] = event.target.value;
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, date, cash } = formData;
    let portfolioId;
    axios
      .post('/portfolios', { name, date, cash })
      .then(({ data }) => {
        portfolioId = data['created_id'];
        const promises = formData.transactions.map(
          ({ symbol, shares, price, type, date }) =>
            axios.post('/transactions', {
              portfolioId,
              symbol,
              shares,
              price,
              type,
              date,
            }),
        );
        return Promise.all(promises);
      })
      .then((responses) => {
        navigate(`/portfolio/${portfolioId}/overview`);
      })
      .catch((error) => console.error(error));
  };

  const addTradeField = () => {
    const newFormData = { ...formData };
    newFormData.transactions.push({
      symbol: '',
      shares: '',
      price: '',
      date: '',
      type: 'buy',
    });
    setFormData(newFormData);
    const newTradeFields = tradeFields + 1;
    setTradeFields(newTradeFields);
  };

  const updateTransaction = (event, key) => {
    const newFormData = { ...formData };
    newFormData.transactions[event.target.name][key] = event.target.value;
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
        size="xl"
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
            {[...Array(tradeFields)].map((field, index) => (
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="addPortfolio.name">
                    <Form.Control
                      name={index}
                      list="sp500DataList"
                      placeholder="Name or symbol"
                      value={formData.transactions[index].symbol}
                      onChange={(e) => {
                        updateTransaction(e, 'symbol');
                      }}
                    />
                    <datalist id="sp500DataList">
                      {universe.map((co) => (
                        <option value={co.symbol} label={co.name} />
                      ))}
                    </datalist>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Control
                      placeholder="Date"
                      type="date"
                      name={index}
                      value={formData.transactions[index].date}
                      onChange={(e) => {
                        updateTransaction(e, 'date');
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>#</InputGroup.Text>
                    <Form.Control
                      placeholder="Shares"
                      type="number"
                      name={index}
                      value={formData.transactions[index].shares}
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
                      name={index}
                      placeholder="Price"
                      value={formData.transactions[index].price}
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
                      name={index}
                      onChange={(e) => {
                        updateTransaction(e, 'type');
                      }}
                      checked={formData.transactions[index].type === 'buy'}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      value="sell"
                      label="Sell"
                      name={index}
                      onChange={(e) => {
                        updateTransaction(e, 'type');
                      }}
                      checked={formData.transactions[index].type === 'sell'}
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
