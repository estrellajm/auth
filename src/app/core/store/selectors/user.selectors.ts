import { createSelector } from "@ngrx/store";

import * as fromRoot from '../reducers';
import * as fromFeature from '../reducers';
import * as fromUser from '../reducers/user.reducers';
import { User } from "../models/user.model";
import { UserState } from "../reducers/user.reducers";

// user state
export const getUser: any =
    createSelector(fromFeature.getUserState,
        (state: fromUser.UserState) => state.user);
export const getUserLoaded =
    createSelector(getUser, fromUser.getUserLoaded);
export const getUserLoading =
    createSelector(getUser, fromUser.getUserLoading);

export const getUserInfo =
    createSelector(getUser, fromUser.getUser);
// export const getUserShifts =
//     createSelector(getUserInfo,
//         (a) => {
//             const shifts = a.shifts
//             if (typeof shifts !== "undefined") {
//                 return Object.keys(shifts).map(id => shifts[id])
//             }
//         }
//     );
// export const getUserShiftsPositions =
//     createSelector(
//         getUserShifts,
//         (a) => {
//             if (typeof a !== "undefined") {
//                 return a.map(id => id.position)
//             }
//         }
//     );
