import { toCurrency, toPercent } from './utils';
import { Table } from 'react-bootstrap';
import { portfolio } from './mockPortfolio';

export default function PortfolioSummary() {
  const {
    cash,
    investments,
    totalMktVal,
    returnSinceInception,
    percentSinceInception,
    returnYTD,
    percentYTD,
    bookCost,
    unrealizedGains,
    numHoldings,
    top3Holdings,
  } = portfolio;

  return (
    <div className="px-3 py-3">
      <h4>Portfolio summary</h4>
      <div className="mt-4">
        <Table borderless responsive>
          <tr>
            <td>Cash</td>
            <td className="text-end">{toCurrency(cash)}</td>
          </tr>
          <tr>
            <td>Investments</td>
            <td className="text-end">{toCurrency(investments)}</td>
          </tr>
          <tr>
            <td className="fw-bold">Total market value</td>
            <td className="text-end fw-bold">{toCurrency(totalMktVal)}</td>
          </tr>
          <tr>
            <br />
          </tr>
          <tr>
            <td className="fw-bold">Total return</td>
            <td className="text-end fw-bold">
              {toCurrency(returnSinceInception)}
            </td>
          </tr>
          <tr>
            <td>
              <small>(Since inception)</small>
            </td>
            <td className="text-end">
              <small>{toPercent(percentSinceInception)}</small>
            </td>
          </tr>
          <tr>
            <br />
          </tr>
          <tr>
            <td>Total return</td>
            <td className="text-end">{toCurrency(returnYTD)}</td>
          </tr>
          <tr>
            <td>
              <small>(Year-to-date)</small>
            </td>
            <td className="text-end">
              <small>{toPercent(percentYTD)}</small>
            </td>
          </tr>
          <tr>
            <br />
          </tr>
          <tr>
            <td>Book cost of investments</td>
            <td className="text-end">{toCurrency(bookCost)}</td>
          </tr>
          <tr>
            <td className="fw-bold">Unrealized gains</td>
            <td className="text-end fw-bold">{toCurrency(unrealizedGains)}</td>
          </tr>
          <tr>
            <br />
          </tr>
          <tr>
            <td>Number of holdings</td>
            <td className="text-end">{numHoldings}</td>
          </tr>
          <tr>
            <br />
          </tr>
          <tr>
            <td className="fw-bold">Top 3 holdings</td>
          </tr>
          {top3Holdings.map((holding) => (
            <tr>
              <td>{holding.name}</td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
