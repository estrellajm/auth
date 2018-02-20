import { createSelector } from "@ngrx/store";

import * as fromFeature from '../reducers';
import * as fromUser from '../reducers/user.reducers';

import { User } from "../models/user.model";
import { UserState } from "../reducers/user.reducers";

// user state === STILL GETTING UNDEFINED!! ===
// export const getUser: any =
//     createSelector(fromFeature.getUserState,
//         (state: fromFeature.UserState) => state);
export const getUser: any =
    createSelector(fromUser.getUser,
        (state: fromUser.UserState) => state);
export const getUserID =
    createSelector(getUser, (a) => a['uid']);
export const getUserLoaded =
    createSelector(getUser, (a) => a['loaded']);
export const getUserLoading =
    createSelector(getUser, (a) => a['loading']);

export const getUserShifts =
    createSelector(getUser,
        (a) => {
            // console.log(a)
            const shifts = a['shifts']
            return Object.keys(shifts).map(id => shifts[id])
        }
    );
export const getUserShiftsPositions =
    createSelector(
        getUserShifts,
        (a) => {
            // console.log(a)
            return a.map(id => id.position)
        }
    );
