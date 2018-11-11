/* eslint-disable no-console */
import axios from 'axios';
import { LOGIN_URL, REGISTER_URL, LOGOUT_URL, ME_TODO_URL, TODO_URL, USERS_URL } from './ConstantService';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

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
    return axios.get(ME_TODO_URL, ENABLE_CREDENTIALS_CHECK);
}

/**
 * Send a new task on the API
 * @param {str} title the title of the new task
 * @param {str} description the description of the new task
 */
export const postTask = (title, description) => {
    return axios.post(TODO_URL, { title, description }, ENABLE_CREDENTIALS_CHECK);
}

/**
 * Patch a specific task
 * @param {int} id The id of the task
 * @param {object} task The JSON data of a task
 */
export const patchTask = (id, task) => {
    return axios.patch(`${TODO_URL}${id}/`, task, ENABLE_CREDENTIALS_CHECK);
}

/**
 * Remove a specific task from the API
 * @param {*} id Id of the task
 */
export const removeTask = id => {
    return axios.delete(`${TODO_URL}${id}/`, ENABLE_CREDENTIALS_CHECK);
}

/**
 * Retrieve the suers from the API
 */
export const users = () => {
    return axios.get(USERS_URL, ENABLE_CREDENTIALS_CHECK);
}

/**
 * Path the user into the API
 * @param {int} id the user id
 * @param {object} info the user information
 */
export const patchUser = (id, info) => {
    return axios.patch(`${USERS_URL}${id}/`, info, ENABLE_CREDENTIALS_CHECK);
}

/**
 * Delete an user with specific ID on the database
 * @param {int} id the user id
 */
export const deleteUser = id => {
    return axios.delete(`${USERS_URL}${id}/`, ENABLE_CREDENTIALS_CHECK);
}

/**
 * Post an user object to the API
 * @param {*} user The user being inserted
 */
export const postUser = user => {
    return axios.post(USERS_URL, user, ENABLE_CREDENTIALS_CHECK);
}
