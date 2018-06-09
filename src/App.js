import React, { Component } from 'react';
import Main from "./components/main";
import { Navbar, NavbarBrand } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar color="light" light expand="md">
          <NavbarBrand>Battle Ship Game</NavbarBrand>
        </Navbar>
        <Main/>
      </div>
    );
  }
}

export default App;
