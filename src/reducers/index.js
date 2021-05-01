import { combineReducers } from 'redux';
import { postPanjai } from './postPanjai';
import { postFDT } from './postFDT';
import { report } from './report';
import { profile } from './profile';

export const reducers = combineReducers({
    postPanjai,
    postFDT,
    report,
    profile
})
