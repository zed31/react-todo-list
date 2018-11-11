import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { patchTask, removeTask } from '../services/ApiService';
import SnackBarError from '../utils/SnackBarError';

const styles = {
    card: {
      maxWidth: 345,
      minWidth: 345
    },
    media: {
      height: 140,
    },
};

class Task extends Component {
    /**
     * @constructor
     * @param {*} props The task component properties
     */
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            status: this.props.status,
            modification: false,
            errorMessage: null,
            backgroundColor: this.props.status === 'D' ? 'green' : 'white'
        }
    }

    /**
     * Check if modified fields are valids
     * @return true if all fields are valids, false otherwise
     */
    areFieldsValids = () => {
        return this.state.title !== '' && this.state.description !== '';
    }

    /**
     * Called when an input change
     * @param {str} name The name of the input being modified
     * @param {event} event The event that trigger the changes
     */
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    /**
     * Change the state to a modification state
     */
    openModification = () => {
        this.setState({
            modification: true
        });
    }

    /**
     * Change the state to a modification close state
     */
    sendModification = () => {
        const { title, description } = this.state;
        const { id } = this.props;
        if (this.areFieldsValids(title, description)) {
            patchTask(id, { title, description }).then(response => {
                this.closeModification();
            }).catch(error => {
                this.setState({
                    errorMessage: error.response.data.errors
                })
            })
        } else {
            this.setState({
                errorMessage: 'Error: Fields title and description are invalids'
            });
        }
    }

    /**
     * Modify the status of the task inside the API
     * @param {str} status The status of the task
     * @param {str} backgroundColor The background color of the task
     */
    modifyTaskStatus = (status, backgroundColor) => {
        const { id } = this.props;
        patchTask(id, { status }).then(response => {
            this.setState({ status, backgroundColor });
        }).catch(error => {
            this.setState({
                errorMessage: error.response.data.errors
            });
        })
    }

    /**
     * Set a task to done
     */
    setToDone = () => {
        this.modifyTaskStatus('D', 'green');
        this.props.onStatusChange(this.props.id, 'D')
    }

    /**
     * Set task to created
     */
    setToCreated = () => {
        this.modifyTaskStatus('C', 'white');
        this.props.onStatusChange(this.props.id, 'C')
    }

    /**
     * Called to close modifications
     */
    closeModification = () => {
        this.setState({ modification: false });
    }

    /**
     * Called when the snackbar close
     */
    closeSnackBar = () => {
        this.setState({
            errorMessage: null
        });
    }

    /**
     * Remove a task from the list and the API
     */
    removeTask = () => {
        const { id } = this.props;
        removeTask(id).then(response => {
            this.props.onTaskRemove(id);
        }).catch(error => {
            console.log(error);
        })
    }

    /**
     * Render the Task react component
     */
    render() {
        const { title, description, status, modification, errorMessage, backgroundColor } = this.state;
        const { owner, classes, created, readOnly } = this.props;

        return (
            <Fragment>
                <Card className={classes.card}>
                    <CardContent style={{ backgroundColor }}>
                        {!modification && 
                            <Fragment>
                                <Typography component="p">
                                    Created on: {new Date(created).toLocaleDateString()}
                                </Typography>
                                <Typography component="p">
                                    Status: {status}
                                </Typography>
                                <Typography component="p">
                                    Owner: {owner}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {title}
                                </Typography>
                                <Typography component="p">
                                    {description}
                                </Typography>
                            </Fragment>
                        }
                        { modification && !readOnly &&
                            <Fragment>
                                <Typography component="p">
                                    Status: {status}
                                </Typography>
                                <Typography component="p">
                                    Owner: {owner}
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
                            </Fragment>
                        }
                    </CardContent>
                    {!readOnly && <CardActions>
                        <Button onClick={this.removeTask} size="small" color="primary">
                            Remove
                        </Button>
                        { !modification && <Button onClick={this.openModification} size="small" color="primary">
                            Edit
                        </Button>}
                        { modification && <Button onClick={this.sendModification} size="small" color="primary">
                            Send
                        </Button>}
                        <Button onClick={this.setToDone} size="small" color="primary">
                            Set to done
                        </Button>
                        <Button onClick={this.setToCreated} size="small" color="primary">
                            Set to created
                        </Button>
                        { modification && <Button onClick={this.closeModification} size="small" color="primary">
                            Close
                        </Button>}
                    </CardActions>}
                </Card>
                {errorMessage && <SnackBarError message={errorMessage} closeSnackBar={this.closeSnackBar} />}
            </Fragment>
        )
    }
}

Task.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Task);
