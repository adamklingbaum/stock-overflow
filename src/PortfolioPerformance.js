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
import faker from 'faker';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
        stepSize: 0.05,
      },
      grace: '0.05',
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

/* export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.float({ min: -1, max: 2 })),
      borderColor: '#0d6efd',
      backgroundColor: 'rgba(13, 110, 253, 0.5)',
    },
  ],
}; */

// Look into time series scale

export default function PortfolioSummary() {
  let { id } = useParams();

  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get(`/portfolios/${id}/daily`).then(({ data }) => {
      setLabels(Object.keys(data));
      setSeries(data);
      setShow(true);
      console.log(data);
    });
  }, []);

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
