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

import { BookService } from '../services/book';
import * as bookActions from '../actions/book';
import { Book } from '../models/book';

@Injectable()
export class BookEffects {
    constructor(private actions$: Actions, private bookService: BookService) {

    }

    @Effect()
    loadBooks$: Observable<Action> = this.actions$
        .ofType(bookActions.ActionTypes.LOAD_BOOKS)
        .switchMap(() =>
            this.bookService.loadBooks()
                .map((books: Book[]) => new bookActions.LoadBooksSuccessAction(books))
                .catch(error => of(new bookActions.LoadBooksFailAction(error)))
        );

    @Effect()
    addBook$: Observable<Action> = this.actions$
        .ofType(bookActions.ActionTypes.ADD_BOOK)
        .map((action: bookActions.AddBookAction) => action.payload)
        .mergeMap((book) => this.bookService.addBook(book)
            .map((response) => { return Object.assign({}, book, { Id: response['Id']}) })
            .map((bookWithId => new bookActions.AddBookSuccessAction(bookWithId)))
            .catch((e) => of(new bookActions.AddBookFailAction(e))));

}

