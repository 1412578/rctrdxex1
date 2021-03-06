/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_USERNAME = 'boilerplate/Home/CHANGE_USERNAME';
export const API_REQUEST = 'boilerplate/Home/API_REUQEST';
export const API_REQUEST_SUCCESS = 'boilerplate/Home/API_REUQEST_SUCCESS';
export const API_REQUEST_FAILURE = 'boilerplate/Home/API_REUQEST_FAILURE';
export const LIST_DIAGRAM_REQUEST = 'boilerplate/Home/LIST_REQUEST_REQUEST';
export const LIST_DIAGRAM_SUCCESS = 'boilerplate/Home/LIST_REQUEST_SUCCESS';
export const LIST_DIAGRAM_FAILURE = 'boilerplate/Home/LIST_REQUEST_FAILURE';
