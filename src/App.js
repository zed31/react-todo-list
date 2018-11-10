import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes, { instanceOf } from 'prop-types';
import './App.css';
import Header from './header/Header'
import Account from './account/Account'
import { withCookies, Cookies } from 'react-cookie';
import { COOKIE_SESSION_ID, COOKIE_USER_REGISTERED, TASK_LIST_INDEX, SIGN_IN_AND_UP_INDEX, ADMINISTRATOR_PANEL } from './utils/Constants';

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
  static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };

  /**
   * @constructor
   * @param {*} props Properties of the APP component 
   */
  constructor(props) {
    super(props);
    const userFromCookies = this.props.cookies.get(COOKIE_USER_REGISTERED);
    const sessionIdFromCookies = this.props.cookies.get(COOKIE_SESSION_ID);
    this.state = {
      user: userFromCookies,
      sessionId: sessionIdFromCookies,
      value: userFromCookies && sessionIdFromCookies ? TASK_LIST_INDEX : SIGN_IN_AND_UP_INDEX,
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
    this.setState({ user, value: TASK_LIST_INDEX });
  }

  /**
   * Called when the logout is done, remove cookies session
   * and user inside the component state
   */
  onLogout = () => {
    this.setState({
      user: null,
      sessionId: null
    });
  }

  /**
   * Render the App component
   */
  render() {
    const { value, user } = this.state
    return (
      <div className="App">
          <Header user={user} onTabChange={this.onTabChange} />
          {value === SIGN_IN_AND_UP_INDEX && <Account onLogin={this.onUserSet} onLoginError={this.onLoginError} />}
          {value === TASK_LIST_INDEX && <TabContainer>Task list</TabContainer>}
          {value === ADMINISTRATOR_PANEL && <TabContainer>Administrator panel</TabContainer>}
      </div>
    );
  }
}

export default withCookies(App);
