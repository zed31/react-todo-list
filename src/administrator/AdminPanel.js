import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UserList from './UserList';
import TaskList from './TaskList';

/**
 * Define the style of the AdminPanel component
 * @param {*} theme Material-ui theme
 */
const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
});

const TASK_PANEL = 1;
const USER_PANEL = 0;

class AdminPanel extends Component {
    /**
     * @constructor
     * @param {*} props AdminPanel properties
     */
    constructor(props) {
        super(props);
        this.state = {
            triggeredTab: 0
        };
    }

    /**
     * Handle tab changed
     * @param {int} triggeredTab the current tab being triggered
     */
    handleChange = triggeredTab => _ => {
        this.setState({ triggeredTab });
    }

    /**
     * Render the AdminPanel component
     */
    render() {
        const { classes } = this.props;
        const { triggeredTab } = this.state;
        
        return (
            <div className={classes.root}>
                <AppBar position="static" color='default'>
                    <Tabs value={triggeredTab}>
                        <Tab value={USER_PANEL} onClick={this.handleChange(USER_PANEL)} label="USER PANEL" />
                        <Tab value={TASK_PANEL} onClick={this.handleChange(TASK_PANEL)} label="TASKS PANEL" />
                    </Tabs>
                </AppBar>
                { triggeredTab === USER_PANEL && <UserList /> }
                { triggeredTab === TASK_PANEL && <TaskList /> }
            </div>
        )
    }
}

AdminPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPanel);
