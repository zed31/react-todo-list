/* eslint-disable no-console */
import axios from 'axios';
import { LOGIN_URL, REGISTER_URL, LOGOUT_URL, TODO_URL } from './ConstantService';

const ENABLE_CREDENTIALS_CHECK = { withCredentials: true };

/**
 * Send Register request to the API
 * @param {str} email user email
 * @param {str} password user password
 */
export const register = (email, password) => {
    return axios.post(REGISTER_URL, { email, password });
}

/**
 * Send login request to the API
 * @param {str} email The user email
 * @param {str} password The user password
 */
export const login = (email, password) => {
    return axios.post(LOGIN_URL, { email, password }, ENABLE_CREDENTIALS_CHECK);
}

/**
 * Logout from the website
 */
export const logout = () => {
    return axios.get(LOGOUT_URL, ENABLE_CREDENTIALS_CHECK);
}

/**
 * Retrieve all the todo from the current session
 */
export const todo = () => {
    return axios.get(TODO_URL, ENABLE_CREDENTIALS_CHECK);
}
