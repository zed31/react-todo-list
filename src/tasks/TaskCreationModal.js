import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SnackBarError from '../utils/SnackBarError';
import { postTask } from '../services/ApiService';

/**
 * Styles of the modal on the Material-UI
 * @param {*} theme The theme of the Material-UI design
 */
const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    addButton: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class TaskModal extends Component {
    /**
     * @constructor
     * @param {*} props TaskModal component properties
     */
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: '',
            description: '',
            error: null
        };
    }

    /**
     * Check if fields of the modals are corrects
     * @param {str} title THe title of the task
     * @param {str} description The description of the task
     */
    confirmFieldAreValids = (title, description) => {
        return title !== '' && description !== '';
    }

    /**
     * Handle changes on the title and description
     * @param {str} name The name of the parameter
     * @param {event} event The event triggered by text fields
     */
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    /**
     * Handle the confirmation of the modal
     */
    handleConfirm = () => {
        const { title, description } = this.state;
        if (!this.confirmFieldAreValids(title, description)) {
            this.setState({
                error: 'Error: You must set correct fields before sending the validation',
            })
        } else {
            postTask(title, description).then(response => {
                this.props.onFieldsValids(response.data);
                this.handleClose();
            }).catch(error => {
                this.setState({
                    error: error.response.data.errors
                });
            })
            
        }
    }

    /**
     * Called when the modal is opening
     */
    handleOpen = () => {
        this.setState({ open: true });
    }

    /**
     * Called when the modal is closing
     */
    handleClose = () => {
        this.setState({ open: false });
    }

    /**
     * Called when the snackbar is closing
     */
    closeSnackbar = () => {
        this.setState({ error: null });
    }

    /**
     * Render the Modal application
     */
    render() {
        const { classes } = this.props;
        const { open, title, description, error } = this.state;

        return (
            <div>
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                    open={open} onClose={this.handleClose}>
                    <div className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            Add a task
                        </Typography>
                        <TextField
                            id="outlined-title"
                            label="Title"
                            placeholder='Enter the title of the task'
                            fullWidth
                            rowsMax="4"
                            value={title}
                            onChange={this.handleChange('title')}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Description"
                            placeholder='Enter a short description'
                            multiline
                            fullWidth
                            rowsMax="4"
                            value={description}
                            onChange={this.handleChange('description')}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button onClick={this.handleConfirm} variant="outlined" color="primary" className={classes.button}>
                            Validate
                        </Button>
                        <Button onClick={this.handleClose} variant="outlined" color="secondary" className={classes.button}>
                            Abort
                        </Button>
                    </div>
                </Modal>
                <Button onClick={this.handleOpen} variant="fab" color="secondary" aria-label="Add" className={classes.addButton}>
                    <AddIcon />
                </Button>
                { error && <SnackBarError closeSnackbar={this.closeSnackbar} message={error} /> }
            </div>
        )
    }
};

TaskModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskModal);
