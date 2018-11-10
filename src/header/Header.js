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
import Grid from '@material-ui/core/Grid'
import './Header.css'

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
            value: 0
        };
    };

    /**
     * Handle changes when someone click on an icon on the header
     * @param {*} event The event being triggered
     * @param {*} value The value that changes inside the state
     */
    handleChange = (event, value) => {
        this.setState((state, props) => {
            state.value = value;
            this.props.onTabChange(value)
        });
    };

    /**
     * Render the Header component
     */
    render() {
        const { classes, user } = this.props
        const { value } = this.state

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Grid container direction="row" justify="space-evenly" alignItems="center">
                        <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons="off">
                            { !user && <Tab label="My account" icon={<PersonPinIcon />} /> }
                            { user && <Tab label="Logout" icon={<PowerSettingsNewIcon />} /> }
                            { user && <Tab label="Administrator panel" icon={<Dashboard />} /> }
                            { user && <Tab label="Access to the tasks" icon={<Assignment />} />}
                        </Tabs>
                    </Grid>
                </AppBar>
            </div>
        );
    };
}

export default withStyles(styles)(Header);
