import React, { Component } from "react";
import TransactionsList from "./components/TransactionsList";
import { Container } from "reactstrap";

class App extends Component {
  render() {
    return (
      <Container>
        <div className="App">
          <TransactionsList />
        </div>
      </Container>
    );
  }
}

export default App;
