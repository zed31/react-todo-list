import React, { Component } from 'react';
import './SnackBarWrapper';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import SnackBarContentWrapper from './SnackBarWrapper';

/**
 * Function used by Material-UI to define the style of a component
 * @param {*} theme the Material-UI theme
 */
const style = theme => ({
    margin: {
      margin: theme.spacing.unit,
    },
});

class SnackBarError extends Component {
    /**
     * @constructor
     * @param {*} props Properties of the SnackBarError component
     */
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    /**
     * Used to close the snackbar
     * @param {*} event The event that triggers the close
     * @param {*} reason The reason for closing the Snackbar
     */
    handleClose = (event, reason) => {
        this.setState({ open: false });
        if (this.props.closeSnackbar) {
            this.props.closeSnackbar();
        }
    }

    /**
     * Render the SnackBarError component
     */
    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
            >
                <SnackBarContentWrapper onClose={this.handleClose} variant="error" message={this.props.message} />
            </Snackbar>
        );
    }

}

export default withStyles(style)(SnackBarError);
