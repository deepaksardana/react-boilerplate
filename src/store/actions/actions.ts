import { Action } from "redux";
/**
 * Defines three actions for the common case of processing an async request:
 */
export interface RequestType {
  /**
   * A request is in progress.
   */
  REQUEST: string;
  /**
   * The request has succeeded.
   */
  SUCCESS: string;
  /**
   * The request failed.
   */
  FAILURE: string;
}
/**
 * Defines our convention for structuring actions.
 */
export interface StandardAction extends Action {
  /**
   * The data associated with the action, such as request parameters or a response.
   */
  payload?: any;
  meta?: any;
}
/**
 * An action creator is simply a function that produces an action.
 */
export interface ActionCreator {
  (...args: any[]): StandardAction;
}
/**
 * Defines a request type, used as the basis for an action type.
 * @param {string} base - The base name of the action type.
 * @returns {RequestType}
 */
export function defineRequestType(base: string): RequestType {
  return ["REQUEST", "SUCCESS", "FAILURE"].reduce<RequestType>((acc: any, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {} as RequestType);
}