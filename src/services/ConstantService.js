const CURRENT_VERSION = "v1";
const AUTH = "auth";
const TODO = "todo";
const USERS = "users";
const ME = "me";
const LOGIN = "login";
const REGISTER = "register";
const LOGOUT = "logout";
const URL = "http://localhost:8000/api";
const VERSIONED_URL = `${URL}/${CURRENT_VERSION}`;
const AUTH_URL = `${VERSIONED_URL}/${AUTH}`;

export const LOGIN_URL = `${AUTH_URL}/${LOGIN}/`;
export const REGISTER_URL = `${AUTH_URL}/${REGISTER}/`;
export const LOGOUT_URL = `${AUTH_URL}/${LOGOUT}/`;