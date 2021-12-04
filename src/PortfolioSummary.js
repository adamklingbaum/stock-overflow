import { toCurrency, toPercent, getTextColor } from './utils';
import { Table, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PortfolioSummary.css';
// import { portfolio } from './mockPortfolio';

export default function PortfolioSummary() {
  let { id: portfolioId } = useParams();
  const [portfolio, setPortfolio] = useState([]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get(`/portfolios/${portfolioId}/summary`).then(({ data }) => {
      setPortfolio(data);
      setShow(true);
    });
  }, [portfolioId]);

  return (
    <div className="px-3 py-3">
      <h4>Portfolio summary</h4>
      <div className="mt-4">
        {show ? (
          <Table borderless responsive>
            <tr>
              <td>Cash</td>
              <td className="text-end">{toCurrency(portfolio.cash)}</td>
            </tr>
            <tr>
              <td>Investments</td>
              <td className="text-end">{toCurrency(portfolio.investments)}</td>
            </tr>
            <tr>
              <td className="fw-bold">Total market value</td>
              <td className="text-end fw-bold">
                {toCurrency(portfolio.totalMktVal)}
              </td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="fw-bold">Total return</td>
              <td
                className={`text-end fw-bold ${getTextColor(
                  portfolio.returnSinceInception,
                )}`}
              >
                {toCurrency(portfolio.returnSinceInception)}
              </td>
            </tr>
            <tr>
              <td>
                <small>(Since inception)</small>
              </td>
              <td
                className={`text-end ${getTextColor(
                  portfolio.percentSinceInception,
                )}`}
              >
                <small>{`${
                  portfolio.percentSinceInception > 0 ? '+' : ''
                }${toPercent(portfolio.percentSinceInception)}`}</small>
              </td>
            </tr>
            <tr>
              <br />
            </tr>
            {/* <tr>
              <td>Total return</td>
              <td className="text-end">{toCurrency(portfolio.returnYTD)}</td>
            </tr>
            <tr>
              <td>
                <small>(Year-to-date)</small>
              </td>
              <td className="text-end">
                <small>{toPercent(portfolio.percentYTD)}</small>
              </td>
            </tr>
            <tr>
              <br />
            </tr> */}
            <tr>
              <td>Book cost of investments</td>
              <td className="text-end">{toCurrency(portfolio.bookCost)}</td>
            </tr>
            <tr>
              <td className="fw-bold">Unrealized gain/loss</td>
              <td
                className={`text-end fw-bold ${getTextColor(
                  portfolio.unrealizedGains,
                )}`}
              >
                {toCurrency(portfolio.unrealizedGains)}
              </td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td>Number of holdings</td>
              <td className="text-end">{portfolio.numHoldings}</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="fw-bold">Top 3 holdings</td>
            </tr>
            {portfolio.top3Holdings.map((holding) => (
              <tr>
                <td>{holding.name}</td>
                <td className="text-end">{toCurrency(holding.mktVal)}</td>
              </tr>
            ))}
          </Table>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading</span>
          </Spinner>
        )}
      </div>
    </div>
  );
}
