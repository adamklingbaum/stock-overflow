import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toCurrency } from './utils';

export default function AddTransaction({
  portfolio,
  symbol = '',
  label,
  size,
  type = 'buy',
  variant,
}) {
  const [show, setShow] = useState(false);
  const [universe, setUniverse] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get('/securities').then(({ data }) => {
      setUniverse(data);
    });
  }, []);

  const [formData, setFormData] = useState({
    symbol,
    date: '',
    shares: '',
    price: '',
    type,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { portfolioId: portfolio.id, ...formData };
    axios
      .post('/transactions', data)
      .then((response) => {
        setShow(false);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (event, key) => {
    const newFormData = { ...formData };
    newFormData[event.target.name] = event.target.value;
    setFormData(newFormData);
  };

  return (
    <>
      <Button size={size} variant={variant || 'primary'} onClick={handleShow}>
        {label}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="addTransaction.name">
              <Form.Label>Security</Form.Label>
              <Form.Control
                name="symbol"
                list="sp500DataList"
                placeholder="Search a name or symbol"
                value={formData.symbol}
                onChange={handleChange}
              />
              <datalist id="sp500DataList">
                {universe.map((co) => (
                  <option value={co.symbol} label={co.name} />
                ))}
              </datalist>
            </Form.Group>
            <Form.Group className="mb-3" controlId="addTransaction.date">
              <Form.Label>Transaction date</Form.Label>
              <Form.Control
                placeholder="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                value="buy"
                label="Buy"
                name="type"
                onChange={handleChange}
                checked={formData.type === 'buy'}
              />
              <Form.Check
                type="radio"
                value="sell"
                label="Sell"
                name="type"
                onChange={handleChange}
                checked={formData.type === 'sell'}
              />
            </Form.Group>
            <Form.Label htmlFor="addTransaction.shares">
              Number of shares {formData.type === 'buy' ? 'bought' : 'sold'}
            </Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>#</InputGroup.Text>
              <Form.Control
                id="addTransaction.shares"
                placeholder="Shares"
                type="number"
                name="shares"
                value={formData.shares}
                onChange={handleChange}
              />
            </InputGroup>
            <Form.Label htmlFor="addTransaction.price">
              Price {formData.type === 'buy' ? 'paid' : 'received'}
            </Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                min="0.01"
                step="0.01"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
              />
            </InputGroup>
            <Button
              type="submit"
              style={{ display: 'none' }}
              id="btnSubmitPortfolio"
            >
              Create
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p>
            Transaction value: {toCurrency(formData.shares * formData.price)}
          </p>
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
