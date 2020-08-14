import React from 'react';
import axios from 'axios';

const api = 'https://covid19.mathdro.id/api';

const fetchData = async (country) => {
  let newUrl = api;
  if (country) {
    newUrl = `${api}/countries/${country}`;
  }
  try {
    let data = await axios(newUrl);
    return {
      confirmed: data.data.confirmed,
      recovered: data.data.recovered,
      deaths: data.data.deaths,
      lastUpdate: data.data.lastUpdate,
    };
  } catch (err) {
    console.log(err);
  }
};

const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${api}/daily`);
    const newData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const fetchCountries = async () => {
  try {
    const data = await axios.get(`${api}/countries`);
    const { countries } = data.data;
    return countries.map(country=>country.name);
  } catch (err) {
    console.log(err);
  }
};

export { fetchData, fetchDailyData, fetchCountries };
