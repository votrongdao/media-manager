import { Action } from '@ngrx/store';
import { Movie } from '../models/movie';

export const ActionTypes = {
    LOAD_MOVIES: '[Movie] Load Movies',
    LOAD_MOVIES_SUCCESS: '[Movie] Load Movies Success',
    LOAD_MOVIES_FAIL: '[Movie] Load Movies Fail',
    ADD_MOVIE: '[Movie] Add Movie',
    ADD_MOVIE_SUCCESS: '[Movie] Add Movie Success',
    ADD_MOVIE_FAIL: '[Movie] Add Movie Fail',
    UPDATE_MOVIE: '[Movie] Update Movie',
    UPDATE_MOVIE_SUCCESS: '[Movie] Update Movie Success',
    UPDATE_MOVIE_FAIL: '[Movie] Update Movie Fail',
    DELETE_MOVIE: '[Movie] Delete Movie',
    DELETE_MOVIE_SUCCESS: '[Movie] Delete Movie Success',
    DELETE_MOVIE_FAIL: '[Movie] Delete Movie Fail'
};

/* Load Movies */

export class LoadMoviesAction implements Action {
    type = ActionTypes.LOAD_MOVIES;
}

export class LoadMoviesSuccessAction implements Action {
    type = ActionTypes.LOAD_MOVIES_SUCCESS;

    constructor(public payload: Movie[]) {}
}

export class LoadMoviesFailAction implements Action {
    type = ActionTypes.LOAD_MOVIES_FAIL;

    constructor(public payload: any) {}
}

/* Add Movies */

export class AddMovieAction implements Action {
    type = ActionTypes.ADD_MOVIE;

    constructor(public payload: Movie) {}
}

export class AddMovieSuccessAction implements Action {
    type = ActionTypes.ADD_MOVIE_SUCCESS;

    constructor(public payload: Movie) {}
}

export class AddMovieFailAction implements Action {
    type = ActionTypes.ADD_MOVIE_FAIL;

    constructor(public payload: Movie) {}
}

/* Update Movies */

export class UpdateMovieAction implements Action {
    type = ActionTypes.UPDATE_MOVIE;

    constructor(public payload: Movie) {}
}

export class UpdateMovieSuccessAction implements Action {
    type = ActionTypes.UPDATE_MOVIE_SUCCESS;

    constructor(public payload: Movie) {}
}

export class UpdateMovieFailAction implements Action {
    type = ActionTypes.UPDATE_MOVIE_FAIL;

    constructor(public payload: Movie) {}
}

/* Delete Movies */

export class DeleteMovieAction implements Action {
    type = ActionTypes.DELETE_MOVIE;

    constructor(public payload: Movie) {}
}

export class DeleteMovieSuccessAction implements Action {
    type = ActionTypes.DELETE_MOVIE_SUCCESS;

    constructor(public payload: Movie) {}
}

export class DeleteMovieFailAction implements Action {
    type = ActionTypes.DELETE_MOVIE_FAIL;

    constructor(public payload: Movie) {}
}

export type Actions 
    = LoadMoviesAction
    | LoadMoviesSuccessAction
    | LoadMoviesFailAction
    | AddMovieAction
    | AddMovieSuccessAction
    | AddMovieFailAction
    | UpdateMovieAction
    | UpdateMovieSuccessAction
    | UpdateMovieFailAction
    | DeleteMovieAction
    | DeleteMovieSuccessAction
    | DeleteMovieFailAction;