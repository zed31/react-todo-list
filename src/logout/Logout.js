import { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { logout } from '../services/ApiService';
import { COOKIE_SESSION_ID, COOKIE_USER_REGISTERED } from '../utils/Constants';

class Logout extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    /**
     * Render the Logout component
     */
    render() {
        const { cookies } = this.props;
        logout().then(_ => {
            cookies.remove(COOKIE_SESSION_ID);
            cookies.remove(COOKIE_USER_REGISTERED);
            this.props.logoutSuccess();
        }).catch(error => {
            this.props.logoutError(error);
        });
        return (null);
    }
}

export default withCookies(Logout);
