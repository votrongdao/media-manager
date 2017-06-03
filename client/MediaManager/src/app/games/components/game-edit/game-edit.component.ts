import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../shared/reducers';
import * as gameActions from '../../actions/game';
import { Router } from "@angular/router";
import { GameService } from "app/games/services/game";

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  form: FormGroup;
  imageUrl: "";

  constructor(@Inject(FormBuilder)formBuilder: FormBuilder, private store: Store<fromRoot.State>, private router: Router, private gameService: GameService) {
    this.form = formBuilder.group({
      game: formBuilder.group({
        Title: [null, Validators.required],
        Platform: [null, Validators.required]
      })
    });
   }

  ngOnInit() {
  }

  addGame() {
    let game = this.form.value.game;
    game.ImageUrl = this.imageUrl;

    this.store.dispatch(new gameActions.AddGameAction(game));
    this.router.navigate(['/']);
  }

  imageUploadChanged (event) {
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
          let file: File = fileList[0];
          this.gameService.postImage(file).subscribe(r => this.imageUrl = r.imageUrl);
      }
  }



}
