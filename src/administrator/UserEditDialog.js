import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import SnackBarError from '../utils/SnackBarError';
import { patchUser } from '../services/ApiService';

/**
 * Define the style of the Material-UI component
 * @param {*} theme Material-UI theme
 */
const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    }
});

class UserEditDialog extends Component {
    /**
     * @constructor
     * @param {*} props Properties of the UserEditDialog component
     */
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            email: this.props.email,
            password: '',
            confirm: '',
            errorMessage: null
        };
    }

    /**
     * Called when the dialog is closing
     */
    handleClose = () => {
        this.setState({ open: false });
    }

    /**
     * Called when the dialog is opening
     */
    handleClickOpen = () => {
        this.setState({ open: true });
    }

    /**
     * Called when an input change on the dialog
     * @param {str} stateName The key name of the state
     * @param {event} event the triggered event
     */
    handleChanges = stateName => event => {
        this.setState({ [stateName]: event.target.value });
    }

    /**
     * Generate an object from the user input
     */
    generateObject = () => {
        const { email, password, confirm } = this.state;
        let savedObject = {};
        if (email && email !== '') {
            savedObject.email = email;
        } else if (password && password !== '' && password === confirm) {
            savedObject.password = password;
        }
        return savedObject;
    }

    /**
     * Check if modifications are valids and send a
     * request to the API
     */
    saveModification = () => {
        const modification = this.generateObject();
        const { id } = this.props;
        if (Object.keys(modification).length === 0 && modification.constructor === Object) {
            this.setState({ errorMessage: 'Error: Make sure your fields are modified and valids' })
        } else {
            patchUser(id, modification).then(response => {
                this.handleClose();
            }).catch(error => {
                this.setState({ errorMessage: error.response.data.errors });
            })
        }
    }

    /**
     * Called when the snackbar is closed
     */
    closeSnackbar = () => {
        this.setState({errorMessage: null});
    }

    /**
     * Render the UserEditDialog component
     */
    render() {
        const { classes } = this.props;
        const { email, password, errorMessage, confirm } = this.state;

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit user</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Update the email and password of the user
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email-modify-user"
                            label="Email Address"
                            onChange={this.handleChanges('email')}
                            type="email"
                            fullWidth
                            value={email}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password-modify-user"
                            label="Password"
                            type="password"
                            onChange={this.handleChanges('password')}
                            fullWidth
                            value={password}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="confirm-modify-user"
                            label="Confirm password"
                            type="password"
                            onChange={this.handleChanges('confirm')}
                            fullWidth
                            value={confirm}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.saveModification} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button variant="fab" color="secondary" aria-label="Edit" onClick={this.handleClickOpen} className={classes.button}>
                    <Icon>edit_icon</Icon>
                </Button>
                {errorMessage && <SnackBarError message={errorMessage} closeSnackbar={this.closeSnackbar} />}
            </div>
        );
    }
}

export default withStyles(styles)(UserEditDialog);
