import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import './App.css';
import Header from './header/Header'
import Account from './account/Account'

class TabContainer extends Component {
  /**
   * @constructor
   * @param {*} props Properties of the component
   */
  constructor(props) {
      super(props);
      this.propTypes = {
          children: PropTypes.node.isRequired
      };
  }

  /**
   * Render the tab container
   */
  render() {
      return (
          <Typography component="div" style={{ padding: 8 * 3 }}>
              {this.props.children}
          </Typography>
      );
  }
};

class App extends Component {
  /**
   * @constructor
   * @param {*} props Properties of the APP component 
   */
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      user: null
    }
  }

  /**
   * Change the state when the tab change on the header
   * @param {*} value The value of the state that change
   */
  onTabChange = (value) => {
    this.setState({ value })
  }

  /**
   * Called when the user is set
   * @param {*} user the user being set inside the state
   */
  onUserSet = user => {
    this.setState({ user })
  }

  /**
   * Render the App component
   */
  render() {
    const { value, user } = this.state
    return (
      <div className="App">
          <Header user={user} onTabChange={this.onTabChange} />
          {value === 0 && <Account onLogin={this.onUserSet} onLoginError={this.onLoginError} />}
          {value === 1 && <TabContainer>Administrator panel</TabContainer>}
          {value === 2 && <TabContainer>Task list</TabContainer>}
      </div>
    );
  }
}

export default App;
