import React, { Component } from 'react';
import Classes from './Tracker.module.css';
import Aux from '../../HOC/Auxillary/Aux';
import { fetchData, fetchCountries } from '../API/Api';
import Cards from '../Cards/Cards';
import SelectCountry from '../SelectCountry/SelectCountry';
import Graph from '../Graph/Graph';

class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      data: '',
    };
  }
  async componentDidMount() {
    const retData = await fetchData();
    this.setState({
      data: { ...retData },
    });
  }

  changeCountry = async (country) => {
    const data = await fetchData(country);
    this.setState({
      data: { ...data },
      country: country,
    });
  };

  render() {
    const data = this.state.data;
    const country=this.state.country;
    return (
      <Aux>
        <Cards data={data} country={this.state.country}></Cards>
        <SelectCountry change={this.changeCountry} />
        <Graph data={data} country={country}/>
      </Aux>
    );
  }
}
export default Tracker;
