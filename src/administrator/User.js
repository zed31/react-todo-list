import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
     * Render the Task react component
     */
    render() {
        const { classes } = this.props;
        const { email, isBan, isSuperuser, errorMessage } = this.state;

        return (
            <Fragment>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography component="p">
                            Email: {email}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            Remove
                        </Button>
                        <Button size="small" color="primary">
                            Ban
                        </Button>
                        <Button size="small" color="primary">
                            Set as admin
                        </Button>
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
