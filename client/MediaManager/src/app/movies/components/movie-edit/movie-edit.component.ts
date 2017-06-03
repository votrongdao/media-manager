import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../shared/reducers';
import * as movieActions from '../../actions/movie';
import { Router } from "@angular/router";
import { MovieService } from "../../services/movie";

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  form: FormGroup;
  imageUrl: "";

  constructor(@Inject(FormBuilder)formBuilder: FormBuilder, private store: Store<fromRoot.State>, private router: Router, private movieService: MovieService) {
    this.form = formBuilder.group({
      movie: formBuilder.group({
        Title: [null, Validators.required],
        Director: [null, Validators.required]
      })
    });
   }

  ngOnInit() {
  }

  addMovie() {
    let movie = this.form.value.movie;
    movie.ImageUrl = this.imageUrl;

    this.store.dispatch(new movieActions.AddMovieAction(movie));
    this.router.navigate(['/movies']);
  }

  imageUploadChanged (event) {
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
          let file: File = fileList[0];
          this.movieService.postImage(file).subscribe(r => { this.imageUrl = r.ImageUrl; });
      }
  }



}
