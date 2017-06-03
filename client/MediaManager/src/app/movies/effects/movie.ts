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

import { MovieService } from '../services/movie';
import * as movieActions from '../actions/movie';
import { Movie } from '../models/movie';

@Injectable()
export class MovieEffects {
    constructor(private actions$: Actions, private movieService: MovieService) {

    }

    @Effect()
    loadMovies$: Observable<Action> = this.actions$
        .ofType(movieActions.ActionTypes.LOAD_MOVIES)
        .switchMap(() =>
            this.movieService.loadMovies()
                .toArray()
                .map((movies: Movie[]) => new movieActions.LoadMoviesSuccessAction(movies))
                .catch(error => of(new movieActions.LoadMoviesFailAction(error)))
        );

    @Effect()
    addMovie$: Observable<Action> = this.actions$
        .ofType(movieActions.ActionTypes.ADD_MOVIE)
        .map((action: movieActions.AddMovieAction) => action.payload)
        .mergeMap((movie) => this.movieService.addMovie(movie)
            .map((response) => Object.assign({}, movie, { Id: response['Id']}))
            .map((movieWithId => new movieActions.AddMovieSuccessAction(movieWithId)))
            .catch((e) => of(new movieActions.AddMovieFailAction(e))));

}

