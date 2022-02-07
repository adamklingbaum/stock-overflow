import AddPortfolio from './AddPortfolio.js';

export default function Home() {

  return (
    <div className="my-3">
      <h2>Welcome to Stock Overflow</h2>
      <p>It looks like you do not have any portfolios yet</p>
      <AddPortfolio />
    </div>
  );
}
