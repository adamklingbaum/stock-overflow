import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AddPortfolio from './AddPortfolio.js';

export default function Home() {
  return (
    <div className="my-3">
      <h2>Welcome to Stocks App</h2>
      <p>It looks like you do not have any portfolios yet</p>
      <AddPortfolio />
      {/* <button type="button">Add portfolio</button> */}
      {/* <Link to="/portfolio/1">Create</Link> */}
    </div>
  );
}
