import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import SnackBarError from '../utils/SnackBarError';
import { createTaskForAnotherUser } from '../services/ApiService';
import AddIcon from '@material-ui/icons/Add';

/**
 * Define the style of the Material-UI component
 * @param {*} theme Material-UI theme
 */
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

class TaskCreationDialog extends Component {
    /**
     * @constructor
     * @param {*} props Properties of the UserCreationDialog
     */
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
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
     * Close the snackbar by removing the error message
     */
    closeSnackbar = () => {
        this.setState({ errorMessage: null });
    }

    /**
     * Create a task and send it to the API
     */
    createTask = () => {
        const { title, description } = this.state;
        const { email } = this.props;
        if (email !== '' && title !== '' && description !== '') {
            createTaskForAnotherUser({ title, description, owner: email }).then(response => {
                this.handleClose();
            }).catch(error => {
                this.setState({ error: error.response.data.errors });
            })
        } else {
            this.setState({ errorMessage: 'Error: Make sure every fields are corrects' });
        }
    }

    /**
     * Render the UserCreationDialog component
     */
    render() {
        const { classes } = this.props;
        const { title, description, errorMessage } = this.state;
        return (
            <Fragment>
                <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Add task</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title-add-task"
                                label="Title"
                                onChange={this.handleChanges('title')}
                                fullWidth
                                value={title}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password-add-user"
                                label="Description"
                                multiline
                                rowsMax="4"
                                onChange={this.handleChanges('description')}
                                fullWidth
                                value={description}
                                variant="outlined"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.createTask} color="primary">
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

export default withStyles(styles)(TaskCreationDialog);
