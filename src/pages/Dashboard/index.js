import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { Line } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';

import Paper from "components/Paper";

import style from './index.module.scss';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      // display: false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'title',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data_1 = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [20, 50, 100, 30 , 300, 70, 19],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [100, 250, 40, 50 , 200, 170, 219],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

const data_2 = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'label',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const Dashboard = () => {

  return (
    <div className={style.block}>
      <Paper headline={"Bar chart"}>
        <Bar options={options} data={data_1} />
      </Paper>
      <Paper headline={"Line chart"}>
        <Line options={options} data={data_1} />
      </Paper>
      <Paper headline={"Pie chart"}>
        <Pie options={options} data={data_2} />
      </Paper>
    </div>
  );
}

export default Dashboard;
