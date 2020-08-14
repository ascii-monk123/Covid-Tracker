import React, { Component } from 'react';
import Classes from './Header.module.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimension = this.updateWindowDimension.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimension();
    window.addEventListener('resize', this.updateWindowDimension);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimension);
  }

  updateWindowDimension() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  render() {
    let source = 'https://world19covid.web.app/static/media/image.d7265326.png';
    let header = null;
    if (this.state.width < 400) {
      source =
        'https://www.pimw.org/wp-content/uploads/2020/03/coronavirus2-red-small.png';
      header = <h1>COVID 19 TRACKER</h1>;
    }
    return (
      <header className={Classes.Header}>
        <div className={Classes.image}>
          <img src={source}></img>
        </div>
        {header}
        <p>
          <i>(For a Particlar select a Country from below)</i>
        </p>
      </header>
    );
  }
}

export default Header;
