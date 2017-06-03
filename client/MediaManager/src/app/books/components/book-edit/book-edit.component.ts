import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../shared/reducers';
import * as bookActions from '../../actions/book';
import { Router } from "@angular/router";
import { BookService } from "../../services/book";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  form: FormGroup;
  imageUrl: "";

  constructor(@Inject(FormBuilder)formBuilder: FormBuilder, private store: Store<fromRoot.State>, private router: Router, private bookService: BookService) {
    this.form = formBuilder.group({
      book: formBuilder.group({
        Title: [null, Validators.required],
        Author: [null, Validators.required]
      })
    });
   }

  ngOnInit() {
  }

  addBook() {
    let book = this.form.value.book;
    book.ImageUrl = this.imageUrl;

    this.store.dispatch(new bookActions.AddBookAction(book));
    this.router.navigate(['/books']);
  }

  imageUploadChanged (event) {
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
          let file: File = fileList[0];
          this.bookService.postImage(file).subscribe(r => this.imageUrl = r.ImageUrl);
      }
  }



}
