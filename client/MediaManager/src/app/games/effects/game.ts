import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { GameService } from '../services/game';
import * as gameActions from '../actions/game';
import { Game } from "app/games/models/game";

@Injectable()
export class GameEffects {
    constructor(private actions$: Actions, private gameService: GameService) {

    }

    @Effect()
    loadGames$: Observable<Action> = this.actions$
        .ofType(gameActions.ActionTypes.LOAD_GAMES)
        .switchMap(() =>
            this.gameService.loadGames()
                .toArray()
                .map((games: Game[]) => new gameActions.LoadGamesSuccessAction(games))
                .catch(error => of(new gameActions.LoadGamesFailAction(error)))
        );

    @Effect()
    addGame$: Observable<Action> = this.actions$
        .ofType(gameActions.ActionTypes.ADD_GAME)
        .map((action: gameActions.AddGameAction) => action.payload)
        .mergeMap((game) => this.gameService.addGame(game)
            .map((response) => Object.assign({}, game, { id: response['Key']}))
            .map((gameWithId => new gameActions.AddGameSuccessAction(gameWithId)))
            .catch((e) => of(new gameActions.AddGameFailAction(e))));

}

