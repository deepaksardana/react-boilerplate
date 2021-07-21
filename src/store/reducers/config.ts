export interface ConfigState {
  baseUrl: string;
}

const INITIAL_STATE: ConfigState = {
  baseUrl: process.env.REACT_APP_BASE_URL || "/backend"
};


const configState = (state: ConfigState = INITIAL_STATE, action: any): ConfigState => {
  switch (action.type) {
    default:
      return state;
  }
}

export default configState;