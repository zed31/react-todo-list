import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Task from './Task';
import { todo } from '../services/ApiService';
import Grid from '@material-ui/core/Grid';
import TaskCreationModal from './TaskCreationModal';
import SnackBarError from '../utils/SnackBarError';

/**
 * Handle the style of the material-UI TaskList design
 * @param {*} theme the Material-UI theme
 */
const style = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        margin: 10,
    },
    task: {
        margin: 20,
    },
})

class TaskList extends Component {
    /**
     * @constructor
     * @param {*} props The TaskList component properties 
     */
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            error: null
        };
        todo().then(response => {
            this.setState({
                tasks: response.data
            });
        }).catch(error => {
            this.setState({
                error: error.response.data.errors
            });
        })
    }

    /**
     * Add task inside the task array
     * @param {Task} task A JSON task
     */
    addTask = task => {
        this.setState((state, props) => {
            let tasks = state.tasks;
            tasks.push(task);
            return { tasks };
        })
    }

    /**
     * Close the snackbar
     */
    closeSnackbar = () => {
        this.setState({
            error: null
        });
    }

    /**
     * Called when a task is removed
     * @param {int} id The task id
     */
    removeTask = id => {
        let { tasks } = this.state;
        tasks = tasks.filter(task => task.id !== id);
        this.setState({ tasks });
    }

    /**
     * Render the TaskList component
     */
    render() {
        const { classes } = this.props;
        const { tasks, error } = this.state;

        return (
            <Fragment>
                <Grid container direction="row" justify="space-evenly" alignItems="center" className={classes.task}>
                    {tasks.map(task => (
                        <Task key={task.id} id={task.id} onTaskRemove={this.removeTask} title={task.title} owner={task.owner} description={task.description} status={task.status} created={task.created} />
                    ))}
                </Grid>
                <TaskCreationModal onFieldsValids={this.addTask} />
                {error && <SnackBarError message={error} closeSnackbar={this.closeSnackbar} />}
            </Fragment>
        );
    }
}

TaskList.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(style)(TaskList);
