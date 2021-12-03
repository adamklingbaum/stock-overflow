import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddPortfolio() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    date: '',
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
