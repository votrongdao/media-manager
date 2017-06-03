import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../shared/reducers';
import { Observable } from "rxjs/Observable";
import { Movie } from "../../models/movie";
import * as movieActions from '../../actions/movie';

@Component({
  selector: 'app-movie-overview',
  templateUrl: './movie-overview.component.html',
  styleUrls: ['./movie-overview.component.css']
})
export class MovieOverviewComponent implements OnInit {
  movies$: Observable<Movie[]>;

  constructor(private router: Router, private store: Store<fromRoot.State>) {
    this.movies$ = this.store.select(fromRoot.getMovieCollection);
    this.store.dispatch(new movieActions.LoadMoviesAction());
  }

  addNewMovie() {
    this.router.navigate(['/movies/add']);
  }

  ngOnInit() {
    
  }

}
