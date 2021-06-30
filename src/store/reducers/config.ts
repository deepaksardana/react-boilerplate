export interface ConfigState {
  baseUrl: string;
}

const INITIAL_STATE: ConfigState = {
  baseUrl: process.env.REACT_APP_BASE_URL || "/server"
};


export default (state: ConfigState = INITIAL_STATE, action: any): ConfigState => {
  switch (action.type) {
    default:
      return state;
  }
}