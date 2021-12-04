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
      ticks: {
        callback: function (value) {
          return 100 * value + '%';
        },
      },
    },
    x: {
      grid: {
        drawOnChartArea: false, // https://www.chartjs.org/docs/latest/samples/scale-options/grid.html
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.float({ min: -1, max: 2 })),
      borderColor: '#0d6efd',
      backgroundColor: 'rgba(13, 110, 253, 0.5)',
    },
  ],
};

// Look into time series scale

export default function PortfolioSummary() {
  return (
    <div className="py-3">
      <h4>Performance since inception</h4>
      <Line options={options} data={data} />
    </div>
  );
}
