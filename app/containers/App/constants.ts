/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 */
export enum ActionTypes {
  GLOBAL_TRIGGER_SEARCH = '@@app/triggerSearch',
  GLOBAL_SET_SEARCH_TERM = '@@global/setSearchTerm',
  GLOBAL_SET_ERROR_MESSAGE = '@@global/setErrorMessage',
}

export const key = 'global';
