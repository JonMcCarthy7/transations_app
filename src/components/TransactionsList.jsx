import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";

class TransactionsList extends Component {
  state = {
    credentials: {
      email: "",
      password: ""
    },
    token: "",
    transactions: []
  };

  // componentDidMount = async () => {
  //   let results = await axios.get("http://localhost:8000/transactions", {
  //     headers: { token: this.state.token }
  //   });
  //   this.setState({ transactions: results.data });
  // };

  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state.credentials);

    let result = await axios.post(
      "http://localhost:8000/sessions",
      this.state.credentials
    );
    this.setState({ token: result.data.token });
    localStorage.setItem("token", result.data.token);
    this.handleTransactions(result.data.token);
  };

  handleTransactions = async token => {
    let results = await axios.get("http://localhost:8000/transactions", {
      headers: { token }
    });
    this.setState({ transactions: results.data });
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };
  render() {
    const transactions = this.state.transactions.map(el => {
      return (
        <ListGroupItem key={el.id}>
          <ListGroupItemHeading>{el.type}</ListGroupItemHeading>
          <ListGroupItemText>{el.business_name}</ListGroupItemText>
          <ListGroupItemText>{el.amount}</ListGroupItemText>
        </ListGroupItem>
      );
    });
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button>Log In</Button>
        </Form>
        <br />
        <ListGroup>
          <ListGroupItem active>
            <ListGroupItemHeading>Transactions</ListGroupItemHeading>
          </ListGroupItem>
          {transactions}
        </ListGroup>
      </div>
    );
  }
}

export default TransactionsList;
