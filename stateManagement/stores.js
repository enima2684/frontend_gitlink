import {createStore} from "redux";

import {
  mySingleReducer,
} from "./reducers";


export const store = createStore(mySingleReducer);