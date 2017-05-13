import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../shared/reducers';
import * as gameActions from '../../actions/game';
import { Router } from "@angular/router";

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  form: FormGroup;

  constructor(@Inject(FormBuilder)formBuilder: FormBuilder, private store: Store<fromRoot.State>, private router: Router) {
    this.form = formBuilder.group({
      game: formBuilder.group({
        title: [null, Validators.required],
        platform: [null, Validators.required]
      })
    });
   }

  ngOnInit() {
  }

  addGame() {
    this.store.dispatch(new gameActions.AddGameAction(this.form.value.game));
    this.router.navigate(['/']);
  }

}
