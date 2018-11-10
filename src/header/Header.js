import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import Dashboard from '@material-ui/icons/Dashboard';
import Assignment from '@material-ui/icons/Assignment';
import Grid from '@material-ui/core/Grid';
import './Header.css';
import { TASK_LIST_INDEX, SIGN_IN_AND_UP_INDEX, ADMINISTRATOR_PANEL_INDEX, DISCONNECT_INDEX } from '../utils/Constants';

/**
 * Function used to define the style
 * @param {*} theme the theme parameter calls by material-UI
 */
const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
    },
});

class Header extends Component {
    /**
     * @constructor
     * @param {*} props Object properties
     */
    constructor(props) {
        super(props);
        this.propTypes = {
            children: PropTypes.object.isRequired
        };
        this.state = {
            value: 0,
            focusedItem: 0
        };
    };

    /**
     * Handle changes when someone click on an icon on the header
     * @param {*} value The value that changes inside the state
     */
    handleChange = value => {
        this.setState((state, props) => {
            if (value === DISCONNECT_INDEX) {
                state.value = SIGN_IN_AND_UP_INDEX;
                state.focusedItem = SIGN_IN_AND_UP_INDEX;
                this.props.onTabChange(DISCONNECT_INDEX)
            } else {
                state.value = value;
                this.props.onTabChange(value)
            }
        });
    };

    /**
     * Called when there is a changes inside the focus from the header
     * @param {int} value The index of the focused data
     */
    handleFocusChanges = (_, value) => {
        this.setState({ focusedItem: value });
    }

    /**
     * Render the Header component
     */
    render() {
        const { classes, user } = this.props;
        const { focusedItem } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Grid container direction="row" justify="space-evenly" alignItems="center">
                        <Tabs value={focusedItem} onChange={this.handleFocusChanges} scrollable scrollButtons="off">
                            { !user && <Tab onClick={_ => this.handleChange(SIGN_IN_AND_UP_INDEX)} label="My account" icon={<PersonPinIcon />} /> }
                            { user && <Tab onClick={_ => this.handleChange(TASK_LIST_INDEX)} label="Access to the tasks" icon={<Assignment />} />}
                            { user && user.is_superuser && <Tab onClick={_ => this.handleChange(ADMINISTRATOR_PANEL_INDEX)} label="Administrator panel" icon={<Dashboard />} /> }
                            { user && <Tab onClick={_ => this.handleChange(DISCONNECT_INDEX)} label="Logout" icon={<PowerSettingsNewIcon />} /> }
                        </Tabs>
                    </Grid>
                </AppBar>
            </div>
        );
    };
}

export default withStyles(styles)(Header);
