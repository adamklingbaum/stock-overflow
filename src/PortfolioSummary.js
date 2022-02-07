import { toCurrency, toPercent, getTextColor } from './utils';
import { Table, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './PortfolioSummary.css';

export default function PortfolioSummary({ portfolio }) {
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get(`/portfolios/${portfolio.id}/summary`).then(({ data }) => {
      setData(data);
      setShow(true);
    });
  }, [portfolio.id]);

  return (
    <div className="px-3 py-3">
      <h4>Portfolio summary</h4>
      <div className="mt-4">
        {show ? (
          <Table borderless responsive>
            <tr>
              <td>Cash</td>
              <td className="text-end">{toCurrency(data.cash)}</td>
            </tr>
            <tr>
              <td>Investments</td>
              <td className="text-end">{toCurrency(data.investments)}</td>
            </tr>
            <tr>
              <td className="fw-bold">Total market value</td>
              <td className="text-end fw-bold">
                {toCurrency(data.totalMktVal)}
              </td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="fw-bold">Total return</td>
              <td
                className={`text-end fw-bold ${getTextColor(
                  data.returnSinceInception,
                )}`}
              >
                {toCurrency(data.returnSinceInception)}
              </td>
            </tr>
            <tr>
              <td>
                <small>(Since inception)</small>
              </td>
              <td
                className={`text-end ${getTextColor(
                  data.percentSinceInception,
                )}`}
              >
                <small>{`${
                  data.percentSinceInception > 0 ? '+' : ''
                }${toPercent(data.percentSinceInception)}`}</small>
              </td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td>Book cost of investments</td>
              <td className="text-end">{toCurrency(data.bookCost)}</td>
            </tr>
            <tr>
              <td className="fw-bold">Unrealized gain/loss</td>
              <td
                className={`text-end fw-bold ${getTextColor(
                  data.unrealizedGains,
                )}`}
              >
                {toCurrency(data.unrealizedGains)}
              </td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td>Number of holdings</td>
              <td className="text-end">{data.numHoldings}</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="fw-bold">Top 3 holdings</td>
            </tr>
            {data.top3Holdings.map((holding) => (
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
