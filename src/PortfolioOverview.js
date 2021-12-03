import { Routes, Route, useParams } from 'react-router-dom';
export default function PortfolioOverview() {
  let params = useParams();
  return (
    <div>
      <h2>Portfolio overview for portfolio {params.id}</h2>
    </div>
  );
}
