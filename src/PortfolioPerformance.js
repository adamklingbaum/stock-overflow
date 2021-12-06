import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    y: {
      /* max: 1,
      min: -1, */
      ticks: {
        callback: function (value) {
          return Math.round(value * 100) + '%';
        },
      },
    },
    x: {
      grid: {
        drawOnChartArea: false, // https://www.chartjs.org/docs/latest/samples/scale-options/grid.html
      },
      ticks: {
        maxRotation: 0,
        includeBounds: true,
        // maxTicksLimit: 10,
      },
    },
  },
};

// https://www.chartjs.org/docs/latest/axes/labelling.html

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function PortfolioSummary({ portfolio }) {
  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get(`/portfolios/${portfolio.id}/daily`).then(({ data }) => {
      setLabels(Object.keys(data));
      setSeries(data);
      setShow(true);
      console.log(data);
    });
  }, [portfolio.id]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Return',
        data: labels.map(
          (label) => series[label]?.summary.percentSinceInception,
        ),
        borderColor: '#0d6efd',
        backgroundColor: 'rgba(13, 110, 253, 0.5)',
      },
    ],
  };

  return (
    <div className="py-3">
      <h4>Performance since inception</h4>
      {show ? (
        <Line options={options} data={data} />
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}
