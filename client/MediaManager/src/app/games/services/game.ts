import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Game } from '../models/game';
import 'rxjs';
import {Headers} from '@angular/http';

@Injectable()
export class GameService {
    private API_PATH: string = '';

    constructor(private http: Http) {

    }

    loadGames() : Observable<any> {
        return this.http.get("http://localhost:8080/databases/MediaManager/indexes/dynamic/Games")
        .map(res => res.json())
        .flatMap(results => results['Results'])
        .map(game => { console.log("game", game); return Object.assign({}, {
            id: game["@metadata"]["@id"],
            title: game['title'],
            platform: game['platform']
        })});
    }

    addGame(game: Game) : Observable<any> {
        let newGame = Object.assign({}, game);
        console.log("postedValue", newGame);

        let headers = new Headers({'Raven-Entity-Name': 'Games'});
        return this.http.post('http://localhost:8080/databases/MediaManager/Docs', newGame, {headers: headers}).map(res => res.json());
    }

}

