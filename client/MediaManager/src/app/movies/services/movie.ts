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
        return this.http.get("http://145.131.17.225/api/movies")
        .map(res => res.json());
    }

    addMovie(movie: Movie) : Observable<any> {
        let newMovie = Object.assign({}, movie);

        return this.http.post('http://145.131.17.225/api/movies', newMovie).map(res => res.json());
    }

    postImage(file) {
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        headers.append('Accept', 'multipart/form-data');

        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://145.131.17.225/api/images?directory=movies', formData, options).map(res => res.json());
  }

}

