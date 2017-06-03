import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../shared/reducers';
import { Observable } from "rxjs/Observable";
import { Book } from "../../models/book";
import * as bookActions from '../../actions/book';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css']
})
export class BookOverviewComponent implements OnInit {

  books$: Observable<Book[]>;

  constructor(private router: Router, private store: Store<fromRoot.State>) {
    this.books$ = this.store.select(fromRoot.getBookCollection);
    this.store.dispatch(new bookActions.LoadBooksAction());
  }

  addNewBook() {
    this.router.navigate(['/books/add']);
  }

  ngOnInit() {
    
  }

}
