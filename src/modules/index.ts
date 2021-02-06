import { combineReducers } from 'redux';
import todoReducer from './todos';

const rootReducer = combineReducers({ todoReducer });

export default rootReducer;

export type RootType = ReturnType<typeof rootReducer>;
