import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import styles from '../utils/AccountStyle'

class AccountForm extends Component {
    /**
     * @constructor
     * @param {*} props Properties of the AccountForm component
     */
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirm: ''
        };
    }

    /**
     * Called once the whole form is filled
     */
    onSend = () => {
        this.props.onSend(this.state);
    }

    /**
     * Called when the input change
     * @param {*} input The input being changed
     */
    onInputChange = input => {
        this.setState({
            email: input.email,
            password: input.password,
            confirm: input.confirm
        });
    }

    /**
     * Render the AccountForm component
     */
    render() {
        const { classes, buttonName, displayConfirm } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField onChange={(e) => this.onInputChange({email: e.target.value, password: this.state.password, confirm: this.state.confirm})} id="outlined-email-input" label="Email" 
                    className={classes.textField} type="email" name="email" autoComplete="email" margin="normal" variant="outlined" />
                <TextField onChange={(e) => this.onInputChange({email: this.state.email, password: e.target.value, confirm: this.state.confirm})} id="outlined-password-input" label="Password" 
                    className={classes.textField} type="password" autoComplete="current-password" margin="normal" variant="outlined" />
                { displayConfirm && <TextField onChange={(e) => this.onInputChange({email: this.state.email, password: this.state.password, confirm: e.target.value})} id="outlined-password-input-confirm" label="Confirm" 
                    className={classes.textField} type="password" autoComplete="current-password" margin="normal" variant="outlined" /> }
                <Button onClick={this.onSend} variant="outlined" size="large" color="primary" className={classes.button}>
                    {buttonName}
                    <Icon className={classes.rightIcon}>send</Icon>
                </Button>
            </form>
        );
    }
}

export default withStyles(styles)(AccountForm);
