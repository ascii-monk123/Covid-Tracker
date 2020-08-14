import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { fetchDailyData } from '../API/Api';
import Classes from './Graph.module.css';
import { indigo } from '@material-ui/core/colors';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyData: [],
    };
  }
  async componentDidMount() {
    const data = await fetchDailyData();
    this.setState({
      dailyData: [...data],
    });
  }

  render() {
    let line = null;
    let bar = null;
    if (this.state.dailyData.length > 0) {
      let daily = [...this.state.dailyData];
      const state = {
        labels: daily.map((data) => data.date),
        datasets: [
          {
            data: daily.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          },
          {
            data: daily.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.5)',
            fill: true,
          },
        ],
      };
      line = <Line data={state} />;
    }
    if (this.props.country !== '') {
      const info = this.props.data;
      const state = {
        labels: ['Infected', 'Recovered', 'Deaths', 'Active'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
              'rgba(242, 234, 0, 0.5)',
            ],
            hoverBackgroundColor: [
              'rgba(0, 77, 153)',
              'rgba(30, 102, 49)',
              'rgba(255, 51, 51)',
              'rgba(204, 153, 0)',
            ],
            data: [
              info.confirmed.value,
              info.recovered.value,
              info.deaths.value,
              info.confirmed.value - (info.recovered.value - info.deaths.value),
            ],
          },
        ],
      };
      bar = (
        <Bar
          data={state}
          options={{
            legend: { display: false },
            title: {
              display: true,
              text: `Current state in ${this.props.country}`,
            },
          }}
        ></Bar>
      );
    }
    return (
      <div className={Classes.Container}>{this.props.country ? bar : line}</div>
    );
  }
}

export default Graph;
