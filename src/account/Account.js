import React, { Component, Fragment } from 'react';
import Login from '../login/Login'
import Register from '../register/Register'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

/**
 * Function called by Material-UI to define the style of a component
 * @param {*} theme The theme used by material-UI
 */
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class Account extends Component {
    /**
     * @constructor
     * @param {*} props Properties of the Account component
     */
    constructor(props) {
        super(props);
        this.state = {
            displayLogin: true
        };
    }

    /**
     * Display the register form
     */
    displayRegisterForm = _ => {
        this.setState({ displayLogin: false });
    }

    /**
     * Display the login form
     */
    displayLoginForm = _ => {
        this.setState({ displayLogin: true });
    }

    /**
     * Called when the login succeed
     */
    onLogin = user => {
        this.props.onLogin(user);
    }

    /**
     * Called when the registration succeed
     */
    onRegisterComplete = () => {
        this.setState({ displayLogin: true });
    }

    /**
     * Render the Account component
     */
    render() {
        const { displayLogin } = this.state;
        const { classes } = this.props
        return (
            <Fragment>
                { displayLogin &&  <Login onLoginFinished={this.onLogin} /> }
                { !displayLogin && <Register onRegisterComplete={this.onRegisterComplete} /> }
                { displayLogin && <label htmlFor="flat-button-file">
                    <Button value={displayLogin} onClick={this.displayRegisterForm} component="span" className={classes.button}>
                        You don't have an account? Then Sign Up
                    </Button>
                </label> }
                { !displayLogin && <label htmlFor="flat-button-file">
                    <Button value={displayLogin} onClick={this.displayLoginForm} component="span" className={classes.button}>
                        Return to Sign In
                    </Button>
                </label> }
            </Fragment>
        );
    }
}

export default withStyles(styles)(Account)
