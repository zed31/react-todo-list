import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { users } from '../services/ApiService';
import SnackBarError from '../utils/SnackBarError';
import User from './User';

/**
 * Handle the style of the material-UI UserList design
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

const ALL_USERS_INDEX = 0;
const BAN_USERS_INDEX = 1;
const ADMIN_USERS_INDEX = 2;

class UserList extends Component {
    /**
     * @constructor
     * @param {*} prop UserList component properties
     */
    constructor(prop) {
        super(prop);
        this.state = {
            users: [],
            allUsers: [],
            errorMessage: null,
            appBarIndex: 0,
        };
        users().then(response => {
            this.setState({
                users: response.data,
                allusers: response.data
            });
        })
    }

    /**
     * Called when snackbar is closed
     */
    closeSnackbar = _ => {
        this.setState({
            errorMessage: null
        });
    }

    /**
     * Called when the App bar change
     * @param {int} appBarIndex the index on the app bar
     */
    handleChanges = appBarIndex => _ => {
        this.setState({
            appBarIndex
        });
    }

    applyFilter = appBarIndex => {
        const { users } = this.state;
        return users.filter(user => appBarIndex === BAN_USERS_INDEX ? user.is_ban : user.is_superuser);
    }

    /**
     * Render the UserList component
     */
    render() {
        const { classes } = this.props;
        const { users, errorMessage, appBarIndex } = this.state;
        return (
            <Fragment>
                <AppBar position="static" color='default'>
                    <Tabs value={appBarIndex}>
                        <Tab value={ALL_USERS_INDEX} onClick={this.handleChanges(ALL_USERS_INDEX)} label="All users" />
                        <Tab value={BAN_USERS_INDEX} onClick={this.handleChanges(BAN_USERS_INDEX)} label="Banned users" />
                        <Tab value={ADMIN_USERS_INDEX} onClick={this.handleChanges(ADMIN_USERS_INDEX)} label="Administrators" />
                    </Tabs>
                </AppBar>
                <Grid container direction="row" justify="space-evenly" alignItems="center" className={classes.task}>
                    {appBarIndex === ALL_USERS_INDEX && users.map(user => (
                        <User key={user.id} id={user.id} email={user.email} isSuperuser={user.is_superuser} isBan={user.is_ban} />
                    ))}
                    {appBarIndex !== ALL_USERS_INDEX && this.applyFilter(appBarIndex).map(user => (
                        <User key={user.id} id={user.id} email={user.email} isSuperuser={user.is_superuser} isBan={user.is_ban} />
                    ))}
                </Grid>
                {errorMessage && <SnackBarError message={errorMessage} closeSnackbar={this.closeSnackbar} />}
            </Fragment>
        );
    }
};

UserList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(UserList);
