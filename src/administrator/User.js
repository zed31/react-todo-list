import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SnackBarError from '../utils/SnackBarError';
import { patchUser, deleteUser } from '../services/ApiService';
import UserEditDialog from './UserEditDialog';

const styles = {
    card: {
      maxWidth: 345,
      minWidth: 345,
      margin: 10
    },
    media: {
      height: 140,
    },
};

class User extends Component {
    /**
     * @constructor
     * @param {*} props The User component properties
     */
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            isBan: this.props.isBan,
            isSuperuser: this.props.isSuperuser,
            errorMessage: null
        }
    }

    /**
     * Called when snackbar is closed
     */
    closeSnackBar = _ => {
        this.setState({ errorMessage: null })
    }

    /**
     * Called when the state needs to change
     * @param {str} name The name of the state
     * @param {any} value The value mapped to the `name` state
     */
    handleStateChanges = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    /**
     * Patch the is_ban status according to the API
     * @param {boolean} is_ban true if the user is ban, false otherwise
     */
    setUserBanStatus = is_ban => _ => {
        patchUser(this.props.id, { is_ban }).then(response => {
            this.handleStateChanges('isBan', is_ban);
            this.props.onUserBanStatusUpdated(this.props.id, is_ban);
        }).catch(error => {
            this.setState({ errorMessage: error.response.data.errors });
        })
    }

    /**
     * Change the superuser status of an user
     * @param {boolean} is_superuser true if the user is a superuser, false otherwise
     */
    setAdministratorStatus = is_superuser => _ => {
        patchUser(this.props.id, { is_superuser }).then(response => {
            this.handleStateChanges('isSuperuser', is_superuser);
            this.props.onUserAdminStatusUpdated(this.props.id, is_superuser);
        }).catch(error => {
            this.setState({ errorMessage: error.response.data.errors });
        })
    }

    /**
     * Remove an user on the database
     */
    removeUser = () => {
        deleteUser(this.props.id).then(response => {
            if (this.props.onUserRemoved) {
                this.props.onUserRemoved(this.props.id);
            }
        }).catch(error => {
            this.setState({ errorMessage: error.response.data.errors });
        })
    }

    /**
     * Render the Task react component
     */
    render() {
        const { classes, readOnly, id } = this.props;
        const { email, isBan, isSuperuser, errorMessage } = this.state;

        return (
            <Fragment>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography component="p">
                            Email: {email}
                        </Typography>
                    </CardContent>
                    {!readOnly && <CardActions>
                        <Button size="small" color="primary"  onClick={this.removeUser}>
                            Remove
                        </Button>
                        {!isBan && <Button size="small" onClick={this.setUserBanStatus(true)} color="primary">
                            Ban
                        </Button>}
                        {isBan && <Button size="small" onClick={this.setUserBanStatus(false)} color="primary">
                            Unban
                        </Button>}
                        {!isSuperuser && <Button onClick={this.setAdministratorStatus(true)} size="small" color="primary">
                            Set as admin
                        </Button>}
                        {isSuperuser && <Button onClick={this.setAdministratorStatus(false)} size="small" color="primary">
                            Set as casual user
                        </Button>}
                    </CardActions>}
                    <CardActions>
                        <UserEditDialog email={email} id={id} />
                    </CardActions>
                </Card>
                {errorMessage && <SnackBarError message={errorMessage} closeSnackBar={this.closeSnackBar} />}
            </Fragment>
        )
    }
}

User.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);
