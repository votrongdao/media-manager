import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as fromGame from '../../games/reducers/game';

export interface State {
    game: fromGame.State,
    router: fromRouter.RouterState
}

const reducers = {
    game: fromGame.reducer,
    router: fromRouter.routerReducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    if(environment.production) {
        return productionReducer(state, action);
    } else {
        return developmentReducer(state, action);
    }
}

export const getGameState = (state: State) => state.game;

export const getGameEntities = createSelector(getGameState, fromGame.getEntities);
export const getGameIds = createSelector(getGameState, fromGame.getIds);
export const getSelectedGameId = createSelector(getGameState, fromGame.getSelectedId);
export const getSelectedGame = createSelector(getGameState, fromGame.getSelected);

export const getGameCollection = createSelector(getGameEntities, getGameIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});