import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../shared/reducers';
import { Observable } from "rxjs/Observable";
import { Game } from "app/games/models/game";
import * as gameActions from '../../actions/game';

@Component({
  selector: 'app-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.css']
})
export class GameOverviewComponent implements OnInit {
  games$: Observable<Game[]>;

  constructor(private router: Router, private store: Store<fromRoot.State>) {
    this.games$ = this.store.select(fromRoot.getGameCollection);
    this.store.dispatch(new gameActions.LoadGamesAction());
  }

  addNewGame() {
    this.router.navigate(['/games/add']);
  }

  ngOnInit() {
    
  }

}
