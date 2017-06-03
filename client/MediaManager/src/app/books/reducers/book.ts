import { createSelector } from 'reselect';
import { Book } from '../models/book';
import * as bookActions from '../actions/book';

export interface State {
    ids: string[],
    entities: { [Id: string]: Book },
    selectedBookId: string | null
};

const initialState: State = {
    ids: [],
    entities: {},
    selectedBookId: null
};

export function reducer(state = initialState, action: bookActions.Actions): State {
    switch(action.type) {
        case bookActions.ActionTypes.LOAD_BOOKS_SUCCESS: {
            const books = action['payload'];
            const newBooks = books.filter(book => !state.entities[book.Id]);

            const newBookIds = newBooks.map(book => book.Id);
            const newBookEntities = newBooks.reduce((entities: { [Id: string]: Book }, book: Book) => {
                return Object.assign(entities, {
                    [book.Id]: book
                })
            }, {});

            return {
                ids: [...state.ids, ...newBookIds],
                entities: Object.assign({}, state.entities, newBookEntities),
                selectedBookId: state.selectedBookId
            };
        }
        case bookActions.ActionTypes.ADD_BOOK_SUCCESS: {
            let newBook = action['payload'];

            return {
                ids: [...state.ids, newBook.Id],
                entities: Object.assign({}, state.entities, {
                    [newBook.Id]: newBook
                }),
                selectedBookId: state.selectedBookId
            };
        }
        default: {
            return state;
        }
    }
}

export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;
export const getSelectedId = (state: State) => state.selectedBookId;

export const getSelected = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
})