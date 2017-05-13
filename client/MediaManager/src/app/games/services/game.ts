import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Game } from '../models/game';
import 'rxjs';

@Injectable()
export class GameService {
    private API_PATH: string = '';
    static games = [{ id: '1', title: 'Persona 5', platform: 'Playstation 4'}];

    constructor(private http: Http) {

    }

    loadGames() : Observable<any> {
        return Observable.from(GameService.games);
    }

    addGame(game: Game) : Observable<any> {
        let newGame = Object.assign({}, game);
        let maxId = GameService.games[GameService.games.length - 1].id;
        newGame.id = String((Number(maxId) + 1));
        GameService.games.push(newGame);

        let addedGame = [newGame];
        return Observable.from(addedGame);
    }

}

