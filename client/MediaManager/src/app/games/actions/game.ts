import { Action } from '@ngrx/store';
import { Game } from '../models/game';

export const ActionTypes = {
    LOAD_GAMES: '[Game] Load Games',
    LOAD_GAMES_SUCCESS: '[Game] Load Games Success',
    LOAD_GAMES_FAIL: '[Game] Load Games Fail',
    ADD_GAME: '[Game] Add Game',
    ADD_GAME_SUCCESS: '[Game] Add Game Success',
    ADD_GAME_FAIL: '[Game] Add Game Fail',
    UPDATE_GAME: '[Game] Update Game',
    UPDATE_GAME_SUCCESS: '[Game] Update Game Success',
    UPDATE_GAME_FAIL: '[Game] Update Game Fail',
    DELETE_GAME: '[Game] Delete Game',
    DELETE_GAME_SUCCESS: '[Game] Delete Game Success',
    DELETE_GAME_FAIL: '[Game] Delete Game Fail'
};

/* Load Games */

export class LoadGamesAction implements Action {
    type = ActionTypes.LOAD_GAMES;
}

export class LoadGamesSuccessAction implements Action {
    type = ActionTypes.LOAD_GAMES_SUCCESS;

    constructor(public payload: Game[]) {}
}

export class LoadGamesFailAction implements Action {
    type = ActionTypes.LOAD_GAMES_FAIL;

    constructor(public payload: any) {}
}

/* Add Games */

export class AddGameAction implements Action {
    type = ActionTypes.ADD_GAME;

    constructor(public payload: Game) {}
}

export class AddGameSuccessAction implements Action {
    type = ActionTypes.ADD_GAME_SUCCESS;

    constructor(public payload: Game) {}
}

export class AddGameFailAction implements Action {
    type = ActionTypes.ADD_GAME_FAIL;

    constructor(public payload: Game) {}
}

/* Update Games */

export class UpdateGameAction implements Action {
    type = ActionTypes.UPDATE_GAME;

    constructor(public payload: Game) {}
}

export class UpdateGameSuccessAction implements Action {
    type = ActionTypes.UPDATE_GAME_SUCCESS;

    constructor(public payload: Game) {}
}

export class UpdateGameFailAction implements Action {
    type = ActionTypes.UPDATE_GAME_FAIL;

    constructor(public payload: Game) {}
}

/* Delete Games */

export class DeleteGameAction implements Action {
    type = ActionTypes.DELETE_GAME;

    constructor(public payload: Game) {}
}

export class DeleteGameSuccessAction implements Action {
    type = ActionTypes.DELETE_GAME_SUCCESS;

    constructor(public payload: Game) {}
}

export class DeleteGameFailAction implements Action {
    type = ActionTypes.DELETE_GAME_FAIL;

    constructor(public payload: Game) {}
}

export type Actions 
    = LoadGamesAction
    | LoadGamesSuccessAction
    | LoadGamesFailAction
    | AddGameAction
    | AddGameSuccessAction
    | AddGameFailAction
    | UpdateGameAction
    | UpdateGameSuccessAction
    | UpdateGameFailAction
    | DeleteGameAction
    | DeleteGameSuccessAction
    | DeleteGameFailAction;