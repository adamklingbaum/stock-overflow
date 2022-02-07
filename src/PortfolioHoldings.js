import { Table, Spinner } from 'react-bootstrap';
import PortfolioHolding from './PortfolioHolding';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTransaction from './AddTransaction';

export default function PortfolioHoldings({ portfolio }) {
  const [holdings, setHoldings] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get(`/portfolios/${portfolio.id}/holdings`).then(({ data }) => {
      setHoldings(data);
      setShow(true);
    });
  }, [portfolio.id]);

  return (
    <div className="my-3">
      <div className="my-4">
        <div className="py-3">
          <h4>Holdings</h4>
          {show ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>Company</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Shares</th>
                  <th className="text-end">Market value</th>
                  <th className="text-end">Average Cost</th>
                  <th className="text-end">Total Cost</th>
                  <th className="text-end">Unrealized Gain</th>
                  <th className="text-center">Update</th>
                  {/* <th className="text-end">Transaction</th> */}
                </tr>
              </thead>
              <tbody>
                {Object.keys(holdings).map((secId) => (
                  <PortfolioHolding
                    portfolio={portfolio}
                    holding={holdings[secId]}
                  />
                ))}
              </tbody>
            </Table>
          ) : (
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading</span>
              </Spinner>
            </div>
          )}
          <AddTransaction portfolio={portfolio} label="Add transaction" />
        </div>
      </div>
    </div>
  );
}
