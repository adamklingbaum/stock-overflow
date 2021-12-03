import { Routes, Route, useParams } from 'react-router-dom';
export default function PortfolioHoldings() {
  let params = useParams();
  return (
    <div>
      <h2>Portfolio holdings for portfolio {params.id}</h2>
    </div>
  );
}
