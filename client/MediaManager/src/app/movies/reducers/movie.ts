import { createSelector } from 'reselect';
import { Movie } from '../models/movie';
import * as movieActions from '../actions/movie';

export interface State {
    ids: string[],
    entities: { [Id: string]: Movie },
    selectedMovieId: string | null
};

const initialState: State = {
    ids: [],
    entities: {},
    selectedMovieId: null
};

export function reducer(state = initialState, action: movieActions.Actions): State {
    switch(action.type) {
        case movieActions.ActionTypes.LOAD_MOVIES_SUCCESS: {
            const movies = action['payload'];
            const newMovies = movies.filter(movie => !state.entities[movie.Id]);

            const newMovieIds = newMovies.map(movie => movie.Id);
            const newMovieEntities = newMovies.reduce((entities: { [Id: string]: Movie }, movie: Movie) => {
                return Object.assign(entities, {
                    [movie.Id]: movie
                })
            }, {});

            return {
                ids: [...state.ids, ...newMovieIds],
                entities: Object.assign({}, state.entities, newMovieEntities),
                selectedMovieId: state.selectedMovieId
            };
        }
        case movieActions.ActionTypes.ADD_MOVIE_SUCCESS: {
            let newMovie = action['payload'];

            return {
                ids: [...state.ids, newMovie.Id],
                entities: Object.assign({}, state.entities, {
                    [newMovie.Id]: newMovie
                }),
                selectedMovieId: state.selectedMovieId
            };
        }
        default: {
            return state;
        }
    }
}

export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;
export const getSelectedId = (state: State) => state.selectedMovieId;

export const getSelected = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
})