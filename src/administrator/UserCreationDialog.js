import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import SnackBarError from '../utils/SnackBarError';
import { postUser } from '../services/ApiService';
import AddIcon from '@material-ui/icons/Add';

/**
 * Define the style of the Material-UI component
 * @param {*} theme Material-UI theme
 */
const styles = theme => ({
    button: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    }
});

class UserCreationDialog extends Component {
    /**
     * @constructor
     * @param {*} props Properties of the UserCreationDialog
     */
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirm: '',
            open: false,
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
     * Called when there is a change on the state
     * @param {str} stateKey the name of the state key
     * @param {*} event The event that triggers the change
     */
    handleChanges = stateKey => event => {
        this.setState({ [stateKey]: event.target.value });
    }

    /**
     * Create an user and update it inside the db
     */
    createUser = () => {
        const { email, password, confirm } = this.state;
        if (email !== '' && password !== '' && confirm !== '' && password === confirm) {
            postUser({ email, password }).then(response => {
                if (this.props.onUserCreated) {
                    this.props.onUserCreated(response.data);
                }
                this.handleClose();
            }).catch(error => {
                this.setState({ errorMessage: error.response.data.email[0] });
            })
        } else {
            this.setState({ errorMessage: 'Errror: make sure all fields are valids' })
        }
    }

    /**
     * Close the snackbar by removing the error message
     */
    closeSnackbar = () => {
        this.setState({ errorMessage: null });
    }

    /**
     * Render the UserCreationDialog component
     */
    render() {
        const { classes } = this.props;
        const { email, password, confirm, errorMessage } = this.state;
        return (
            <Fragment>
                <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Add user</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email-addr-add-user"
                                label="Email Address"
                                onChange={this.handleChanges('email')}
                                type="email"
                                fullWidth
                                value={email}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password-add-user"
                                label="Password"
                                type="password"
                                onChange={this.handleChanges('password')}
                                fullWidth
                                value={password}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="confirm-add-user"
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
                            <Button onClick={this.createUser} color="primary">
                                Confirm
                            </Button>
                        </DialogActions>
                </Dialog>
                <Button variant="fab" onClick={this.handleClickOpen} color="primary" aria-label="Add" className={classes.button}>
                    <AddIcon />
                </Button>
                {errorMessage && <SnackBarError message={errorMessage} closeSnackbar={this.closeSnackbar} />}
            </Fragment>
        );
    }
};

export default withStyles(styles)(UserCreationDialog);
