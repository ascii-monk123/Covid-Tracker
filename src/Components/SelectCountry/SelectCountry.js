import React, { Component } from 'react';

import Classes from './SelectCountry.module.css';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries } from '../API/Api';

class SelectCountry extends Component {
  constructor(props) {
    super(props);
    this.state = { countries: null };
  }
  async componentDidMount() {
    const countries = await fetchCountries();
    this.setState({
      countries: countries,
    });
  }
  render() {
    let countries = this.state.countries;
    if (!countries) {
      return null;
    }
    return (
      <div className={Classes.container}>
        <FormControl className={Classes.CountriesSelect}>
          <NativeSelect
            defaultValue=""
            onChange={(e) => this.props.change(e.target.value)}
          >
            <option value="">Global</option>
            {countries.map((country, key) => (
              <option key={key} value={country}>
                {country}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

export default SelectCountry;
