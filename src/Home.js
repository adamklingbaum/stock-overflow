import AddPortfolio from './AddPortfolio.js';
import { useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  useEffect(() => {
    axios
      .get('/sports')
      .then((response) => {
        console.log(response);
        console.log('hello');
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="my-3">
      <h2>Welcome to Stock Overflow</h2>
      <p>It looks like you do not have any portfolios yet</p>
      <AddPortfolio />
      {/* <button type="button">Add portfolio</button> */}
      {/* <Link to="/portfolio/1">Create</Link> */}
      {/* <h1>{big}</h1> */}
    </div>
  );
}
