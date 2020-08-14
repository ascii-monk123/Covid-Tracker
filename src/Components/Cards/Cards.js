import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import Classes from './Cards.module.css';
import cx from 'classnames';
import CountUp from 'react-countup';

const Cards = (props) => {
  const { confirmed, recovered, lastUpdate, deaths } = props.data;
  const country = props.country !== '' ? props.country : null;
  if (!confirmed) {
    return <p>Loading.........</p>;
  }
  const active = confirmed['value'] - recovered['value'] - deaths['value'];
  let details = [
    {
      style: Classes.infected,
      heading: 'Infected',
      value: confirmed.value,
      text: 'Number infected by covid 19',
    },
    {
      style: Classes.recovered,
      heading: 'Recovered',
      value: recovered.value,
      text: 'Number of people recovered',
    },
    {
      style: Classes.deaths,
      heading: 'Deaths',
      value: deaths.value,
      text: 'Number of people dead',
    },
    {
      style: Classes.active,
      heading: 'Active',
      value: active,
      text: 'Number of people still infected',
    },
  ];
  return (
    <div className={Classes.Cards}>
      <Grid container spacing={3} justify="center">
        {details.map((detail, index) => {
          return (
            <Grid
              item
              component={Card}
              xs={12}
              md={2}
              className={cx(Classes.Card, detail.style)}
              key={index}
              style={{ margin: '5px 23.675px', padding: '12px' }}
            >
              <CardContent>
                <Typography color="textPrimary" gutterBottom>
                  <b>{detail.heading}</b>
                </Typography>
                <Typography variant="h5">
                  <CountUp
                    start={0}
                    end={detail.value}
                    duration={2}
                    separator=","
                  />
                </Typography>
                <Typography color="textPrimary">Last Updated at:</Typography>
                <Typography color="textSecondary" variant="body2">
                  {new Date(lastUpdate).toLocaleTimeString()}
                </Typography>
                <Typography variant="body2">{detail.text}</Typography>
                <Typography color="textPrimary">{country}</Typography>
              </CardContent>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Cards;
