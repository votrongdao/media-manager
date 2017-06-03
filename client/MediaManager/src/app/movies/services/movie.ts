import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../models/movie';
import 'rxjs';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class MovieService {
    private API_PATH: string = '';

    constructor(private http: Http) {

    }

    loadMovies() : Observable<any> {
        return this.http.get("http://localhost:8080/databases/MediaManager/indexes/dynamic/Movies")
        .map(res => res.json())
        .flatMap(results => results['Results'])
        .map(movie => { return Object.assign({}, {
            Id: movie["@metadata"]["@id"],
            Title: movie['Title'],
            Director: movie['Director'],
            ImageUrl: movie['ImageUrl']
        })});
    }

    addMovie(movie: Movie) : Observable<any> {
        let newMovie = Object.assign({}, movie);

        return this.http.post('http://localhost:4201/api/movies', newMovie).map(res => res.json());
    }

    postImage(file) {
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        headers.append('Accept', 'multipart/form-data');

        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:4201/api/images?directory=movies', formData, options).map(res => res.json());
  }

}

