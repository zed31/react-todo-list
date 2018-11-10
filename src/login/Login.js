import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes, { instanceOf } from 'prop-types';
import Grid from '@material-ui/core/Grid'
import styles from '../utils/AccountStyle'
import SnackBarError from '../utils/SnackBarError';
import AccountForm from '../account/AccountForm';
import { login } from '../services/ApiService';
import { withCookies, Cookies } from 'react-cookie';
import { COOKIE_USER_REGISTERED, COOKIE_SESSION_ID } from '../utils/Constants';
import { computeCookieExpireDate } from '../utils/TimeUtils';

class Login extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    /**
     * @constructor
     * @param {*} props Properties of the Register component
     */
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    /**
     * Check if the login fields are valids
     * @param {str} email The login email
     * @param {str} password THe login password
     * @return true if all fields are valid, false otherwise
     */
    loginFieldsValids = (email, password) => {
        return email !== '' && password !== '';
    }

    /**
     * Called when the account form is filled
     * @param {str, str, str} loginInfo The information about the login
     */
    onLoginComplete = loginInfo => {
        if (!this.loginFieldsValids(loginInfo.email, loginInfo.password)) {
            this.setState({ error: 'Input fields are invalids' });
        } else {
            login(loginInfo.email, loginInfo.password).then(response => {
                const expires = computeCookieExpireDate(14);
                this.props.cookies.set(COOKIE_USER_REGISTERED, response.data, { path: '/', expires });
                this.props.onLoginFinished(response.data);
            }).catch(error => {
                this.setState({ error: error.response.data.errors });
            })
        }
    }

    /**
     * Close the snackbar if the user closed it
     */
    closeSnackbar = () => {
        this.setState({ error : null });
    }

    /**
     * Render the Login component
     */
    render() {
        return (
            <Grid container direction="row" justify="center" alignItems="center">
                <AccountForm onSend={this.onLoginComplete} displayConfirm={false} buttonName='Login' />
                { this.state.error && <SnackBarError closeSnackbar={this.closeSnackbar} message={this.state.error} /> }
            </Grid>
        );
    }
}

export default withCookies(withStyles(styles)(Login));
