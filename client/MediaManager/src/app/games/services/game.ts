import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Game } from '../models/game';
import 'rxjs';

@Injectable()
export class GameService {
    private API_PATH: string = '';

    constructor(private http: Http) {

    }

    loadGames() : Observable<any> {
        let games = [{ id: '1', title: 'Persona 5', platform: 'Playstation 4'}];

        return Observable.from(games);
    }

}

