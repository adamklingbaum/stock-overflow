import { Button } from 'react-bootstrap';
import { toCurrency, toPercent, toNumber, getTextColor } from './utils';

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
      <td className="text-end">
        <div>{toCurrency(price)}</div>
        <small>{toPercent(oneDay)}</small>
      </td>
      <td className="text-end">{toNumber(100)}</td>
      <td className="text-end">{toCurrency(mktVal)}</td>
      <td className="text-end">{toCurrency(avgCost)}</td>
      <td className="text-end">{toCurrency(totalCost)}</td>
      <td className="text-end">
        <div>{toCurrency(unrealizedGain)}</div>
        <small>{toPercent(unrealizedPercent)}</small>
      </td>
      <td className="text-end">
        <div>{toNumber(trades)}</div>
        <Button type="button" size="sm">
          + Trade
        </Button>
      </td>
    </tr>
  );
}
