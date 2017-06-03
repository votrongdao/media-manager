import { Action } from '@ngrx/store';
import { Book } from '../models/book';

export const ActionTypes = {
    LOAD_BOOKS: '[Book] Load Books',
    LOAD_BOOKS_SUCCESS: '[Book] Load Books Success',
    LOAD_BOOKS_FAIL: '[Book] Load Books Fail',
    ADD_BOOK: '[Book] Add Book',
    ADD_BOOK_SUCCESS: '[Book] Add Book Success',
    ADD_BOOK_FAIL: '[Book] Add Book Fail',
    UPDATE_BOOK: '[Book] Update Book',
    UPDATE_BOOK_SUCCESS: '[Book] Update Book Success',
    UPDATE_BOOK_FAIL: '[Book] Update Book Fail',
    DELETE_BOOK: '[Book] Delete Book',
    DELETE_BOOK_SUCCESS: '[Book] Delete Book Success',
    DELETE_BOOK_FAIL: '[Book] Delete Book Fail'
};

/* Load Books */

export class LoadBooksAction implements Action {
    type = ActionTypes.LOAD_BOOKS;
}

export class LoadBooksSuccessAction implements Action {
    type = ActionTypes.LOAD_BOOKS_SUCCESS;

    constructor(public payload: Book[]) {}
}

export class LoadBooksFailAction implements Action {
    type = ActionTypes.LOAD_BOOKS_FAIL;

    constructor(public payload: any) {}
}

/* Add Books */

export class AddBookAction implements Action {
    type = ActionTypes.ADD_BOOK;

    constructor(public payload: Book) {}
}

export class AddBookSuccessAction implements Action {
    type = ActionTypes.ADD_BOOK_SUCCESS;

    constructor(public payload: Book) {}
}

export class AddBookFailAction implements Action {
    type = ActionTypes.ADD_BOOK_FAIL;

    constructor(public payload: Book) {}
}

/* Update Books */

export class UpdateBookAction implements Action {
    type = ActionTypes.UPDATE_BOOK;

    constructor(public payload: Book) {}
}

export class UpdateBookSuccessAction implements Action {
    type = ActionTypes.UPDATE_BOOK_SUCCESS;

    constructor(public payload: Book) {}
}

export class UpdateBookFailAction implements Action {
    type = ActionTypes.UPDATE_BOOK_FAIL;

    constructor(public payload: Book) {}
}

/* Delete Books */

export class DeleteBookAction implements Action {
    type = ActionTypes.DELETE_BOOK;

    constructor(public payload: Book) {}
}

export class DeleteBookSuccessAction implements Action {
    type = ActionTypes.DELETE_BOOK_SUCCESS;

    constructor(public payload: any) {}
}

export class DeleteBookFailAction implements Action {
    type = ActionTypes.DELETE_BOOK_FAIL;

    constructor(public payload: any) {}
}

export type Actions 
    = LoadBooksAction
    | LoadBooksSuccessAction
    | LoadBooksFailAction
    | AddBookAction
    | AddBookSuccessAction
    | AddBookFailAction
    | UpdateBookAction
    | UpdateBookSuccessAction
    | UpdateBookFailAction
    | DeleteBookAction
    | DeleteBookSuccessAction
    | DeleteBookFailAction;