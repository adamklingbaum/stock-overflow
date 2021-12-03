import { Button } from 'react-bootstrap';
export default function PortfolioHolding({ holding }) {
  const {
    name,
    symbol,
    price,
    shares,
    mktVal,
    avgCost,
    totalCost,
    unrealizedGain,
    unrealizedPercent,
    trades,
    oneDay,
  } = holding;
  return (
    <tr>
      <td>
        <div>{symbol}</div>
        <small className="text-muted">{name}</small>
      </td>
      <td>
        <div>{price}</div>
        <small>{oneDay}</small>
      </td>
      <td>{shares}</td>
      <td>{mktVal}</td>
      <td>{avgCost}</td>
      <td>{totalCost}</td>
      <td>
        <div>{unrealizedGain}</div>
        <small>{unrealizedPercent}</small>
      </td>
      <td>
        {trades}
        <Button type="button" size="sm">
          + Trade
        </Button>
      </td>
    </tr>
  );
}
