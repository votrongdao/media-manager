import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Game } from '../models/game';
import 'rxjs';
import { Headers, RequestOptions } from '@angular/http';

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
            Id: game["@metadata"]["@id"],
            Title: game['Title'],
            Platform: game['Platform'],
            ImageUrl: game['ImageUrl']
        })});
    }

    addGame(game: Game) : Observable<any> {
        let newGame = Object.assign({}, game);

        return this.http.post('http://localhost:4201/api/games', newGame).map(res => res.json());
    }

    postImage(file) {
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        headers.append('Accept', 'multipart/form-data');

        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:4201/api/images', formData, options).map(res => res.json());
  }

}

