import { Button } from 'react-bootstrap';
import { toCurrency, toPercent, toNumber, getTextColor } from './utils';
import AddTransaction from './AddTransaction';

export default function PortfolioHolding({ portfolio, holding }) {
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
      <td className={`text-end ${getTextColor(oneDay)}`}>
        <div>{toCurrency(price)}</div>
        <small className={getTextColor(oneDay)}>{`${
          oneDay > 0 ? '+' : ''
        }${toPercent(oneDay)}`}</small>
      </td>
      <td className="text-end">{toNumber(shares)}</td>
      <td className="text-end">{toCurrency(mktVal)}</td>
      <td className="text-end">{toCurrency(avgCost)}</td>
      <td className="text-end">{toCurrency(totalCost)}</td>
      <td className={`text-end ${getTextColor(unrealizedGain)}`}>
        <div>{toCurrency(unrealizedGain)}</div>
        <small>{`${unrealizedPercent > 0 ? '+' : ''}${toPercent(
          unrealizedPercent,
        )}`}</small>
      </td>
      {/* <td className="text-end">
        <div>{toNumber(trades)}</div>
      </td> */}
      <td className="text-center">
        <AddTransaction
          symbol={symbol}
          portfolio={portfolio}
          label="Buy"
          size="sm"
          type="buy"
          variant="success"
        />{' '}
        <AddTransaction
          symbol={symbol}
          portfolio={portfolio}
          label="Sell"
          size="sm"
          type="sell"
          variant="danger"
        />
      </td>
    </tr>
  );
}
