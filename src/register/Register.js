import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import { register } from '../services/ApiService';
import SnackBarError from '../utils/SnackBarError';
import AccountForm from '../account/AccountForm';

class Register extends Component {
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
     * Check if all the fields are valids
     * @param {str} email The user email
     * @param {str} password The user password
     * @param {str} confirm The user password confirmation
     * @returns true if everything is valid, false otherwise
     */
    registerFieldValid = (email, password, confirm) => {
        return email !== '' && password !== '' && confirm !== '' && password === confirm;
    }

    /**
     * Called when the registration is completed
     * @param {str, str, str} registerData The data used to perform the registration
     */
    onRegisterComplete = registerData => {
        if (this.registerFieldValid(registerData.email, registerData.password, registerData.confirm)) {
            register(registerData.email, registerData.password).then(response => {
                this.props.onRegisterComplete();
            }).catch(error => {
                const data = error.response.data.errors;
                this.setState({ error: data });
            });
        } else {
            this.setState({ error: 'Input fields are incorrects' });
        }
    }

    /**
     * Close the snackbar if the user closed it
     */
    closeSnackbar = () => {
        this.setState({ error : null });
    }

    /**
     * Render the Register component
     */
    render() {
        return (
            <Grid container direction="row" justify="center" alignItems="center">
                <AccountForm onSend={this.onRegisterComplete} displayConfirm={true} buttonName='Register' />
                { this.state.error && <SnackBarError closeSnackbar={this.closeSnackbar} message={this.state.error} /> }
            </Grid>
        );
    }
}

export default Register;
