import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRouter from '@ngrx/router-store'
import * as fromUser from "./user.reducers";

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface UserState {
    user: fromUser.UserState;
};

export interface State {
    router: fromRouter.RouterReducerState<RouterStateUrl>,
    user: fromUser.UserState
}

export const reducers: ActionReducerMap<State> = {
    router: fromRouter.routerReducer,
    user: fromUser.userReducer
}

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export const getUserState = createFeatureSelector<fromUser.UserState>('userReducer');


export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        const { url } = routerState;
        const { queryParams } = routerState.root;
        let state: ActivatedRouteSnapshot = routerState.root;
        while(state.firstChild) {
            state = state.firstChild;
        }
        const { params } = state;
        return { url, queryParams, params };
    }
}