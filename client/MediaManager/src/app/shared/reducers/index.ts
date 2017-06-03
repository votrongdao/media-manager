import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as fromGame from '../../games/reducers/game';
import * as fromBook from '../../books/reducers/book';
import * as fromMovie from '../../movies/reducers/movie';

export interface State {
    game: fromGame.State,
    book: fromBook.State,
    movie: fromMovie.State,
    router: fromRouter.RouterState
}

const reducers = {
    game: fromGame.reducer,
    book: fromBook.reducer,
    movie: fromMovie.reducer,
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


/* Book Selectors */

export const getBookState = (state: State) => state.book;

export const getBookEntities = createSelector(getBookState, fromBook.getEntities);
export const getBookIds = createSelector(getBookState, fromBook.getIds);
export const getSelectedBookId = createSelector(getBookState, fromBook.getSelectedId);
export const getSelectedBook = createSelector(getBookState, fromBook.getSelected);

export const getBookCollection = createSelector(getBookEntities, getBookIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});

/* Movie Selectors */

export const getMovieState = (state: State) => state.movie;

export const getMovieEntities = createSelector(getMovieState, fromMovie.getEntities);
export const getMovieIds = createSelector(getMovieState, fromMovie.getIds);
export const getSelectedMovieId = createSelector(getMovieState, fromMovie.getSelectedId);
export const getSelectedMovie = createSelector(getMovieState, fromMovie.getSelected);

export const getMovieCollection = createSelector(getMovieEntities, getMovieIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});

/* Game Selectors */

export const getGameState = (state: State) => state.game;

export const getGameEntities = createSelector(getGameState, fromGame.getEntities);
export const getGameIds = createSelector(getGameState, fromGame.getIds);
export const getSelectedGameId = createSelector(getGameState, fromGame.getSelectedId);
export const getSelectedGame = createSelector(getGameState, fromGame.getSelected);

export const getGameCollection = createSelector(getGameEntities, getGameIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});