import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import './App.css';
import Header from './header/Header'
import Account from './account/Account'
import { withCookies, Cookies } from 'react-cookie';
import { COOKIE_USER_REGISTERED, TASK_LIST_INDEX, SIGN_IN_AND_UP_INDEX, ADMINISTRATOR_PANEL_INDEX, DISCONNECT_INDEX } from './utils/Constants';
import Logout from './logout/Logout';
import TaskList from './tasks/TaskList'
import AdminPanel from './administrator/AdminPanel'

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
    this.state = {
      user: userFromCookies,
      value: userFromCookies ? TASK_LIST_INDEX : SIGN_IN_AND_UP_INDEX,
      needToLogout: false
    }
  }

  /**
   * Change the state when the tab change on the header
   * @param {*} value The value of the state that change
   */
  onTabChange = value => {
    this.setState((state, props) => {
      const needToLogout = value === DISCONNECT_INDEX;
      return {
        value,
        needToLogout
      } 
    });
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
   * Called when the user logged out
   */
  onLogout = () => {
    this.setState({
      user: null,
      value: SIGN_IN_AND_UP_INDEX,
      needToLogout: false
    });
  }

  /**
   * Called when there are any errors on the logout
   * @param {object} response The response from the API
   */
  onLogoutError = response => {
    this.setState({
      needToLogout: false
    })
  }

  /**
   * Render the App component
   */
  render() {
    const { value, user, needToLogout } = this.state
    return (
      <div className="App">
          <Header user={user} onTabChange={this.onTabChange} />
          {value === SIGN_IN_AND_UP_INDEX && <Account onLogin={this.onUserSet} onLoginError={this.onLoginError} />}
          {value === TASK_LIST_INDEX && <TaskList />}
          {value === ADMINISTRATOR_PANEL_INDEX && <AdminPanel />}
          {value === DISCONNECT_INDEX && <Logout needToLogout={needToLogout} logoutSuccess={this.onLogout} logoutError={this.onLogoutError} /> }
      </div>
    );
  }
}

export default withCookies(App);
