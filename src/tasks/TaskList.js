import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Task from './Task';
import { todo } from '../services/ApiService';
import Grid from '@material-ui/core/Grid';
import TaskCreationModal from './TaskCreationModal';
import SnackBarError from '../utils/SnackBarError';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
    menuTabs: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
})

const ALL_TASK_VALUE_FILTER = 0;
const CREATED_TASK_VALUE_FILTER = 1;
const DONE_TASK_VALUE_FILTER = 2;

class TaskList extends Component {
    /**
     * @constructor
     * @param {*} props The TaskList component properties 
     */
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            allTasks: [],
            error: null,
            filteredValue: ALL_TASK_VALUE_FILTER,
        };
        todo().then(response => {
            this.setState({
                tasks: response.data,
                allTasks: response.data
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
        let { allTasks, tasks } = this.state;
        tasks = allTasks.filter(task => task.id !== id);
        allTasks = allTasks.filter(task => task.id !== id);
        this.setState({ tasks, allTasks });
    }

    /**
     * Filter the task by their status
     * @param {str} statusValue The value of the status being filtered
     */
    filterStatus = statusValue => {
        let { allTasks, tasks } = this.state;
        tasks = allTasks.filter(task => task.status === statusValue);
        this.setState({ tasks });
    }

    /**
     * Reset displayed tasks to all tasks
     */
    allTasks = () => {
        this.setState({ tasks: this.state.allTasks });
    }

    /**
     * Apply the filter to the task list
     */
    applyFilter = filteredValue => {
        if (filteredValue === CREATED_TASK_VALUE_FILTER) {
            this.filterStatus('C');
        } else if (filteredValue === DONE_TASK_VALUE_FILTER) {
            this.filterStatus('D');
        } else {
            this.allTasks();
        }
    }

    /**
     * Handle the changes inside the filters
     * @param {str} filteredValue the filtered value
     */
    handleChange = filteredValue => {
        this.setState({ filteredValue });
        this.applyFilter(filteredValue);
    }

    /**
     * Called when the status of a task change
     * @param {int} taskId the Id of the changed task
     * @param {str} status The value of the new tasks status
     */
    taskStatusChanged = (taskId, status) => {
        let { allTasks } = this.state;
        let task = allTasks.find(task => task.id === taskId);
        task.status = status;
        this.applyFilter(this.state.filteredValue);
    }

    /**
     * Render the TaskList component
     */
    render() {
        const { classes } = this.props;
        const { tasks, error, filteredValue } = this.state;

        return (
            <Fragment>
                <AppBar position="static">
                    <Tabs value={filteredValue}>
                        <Tab value={ALL_TASK_VALUE_FILTER} onClick={(e) => this.handleChange(ALL_TASK_VALUE_FILTER)} label="All tasks" />
                        <Tab value={CREATED_TASK_VALUE_FILTER} onClick={(e) => this.handleChange(CREATED_TASK_VALUE_FILTER)} label="Created tasks" />
                        <Tab value={DONE_TASK_VALUE_FILTER} onClick={(e) => this.handleChange(DONE_TASK_VALUE_FILTER)} label="Done tasks" />
                    </Tabs>
                </AppBar>
                <Grid container direction="row" justify="space-evenly" alignItems="center" className={classes.task}>
                    {tasks.map(task => (
                        <Task key={task.id} id={task.id} onStatusChange={this.taskStatusChanged} onTaskRemove={this.removeTask} title={task.title} owner={task.owner} 
                            description={task.description} status={task.status} created={task.created} readOnly={filteredValue !== ALL_TASK_VALUE_FILTER} />
                    ))}
                </Grid>
                {filteredValue === ALL_TASK_VALUE_FILTER && <TaskCreationModal onFieldsValids={this.addTask} />}
                {error && <SnackBarError message={error} closeSnackbar={this.closeSnackbar} />}
            </Fragment>
        );
    }
}

TaskList.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(style)(TaskList);
