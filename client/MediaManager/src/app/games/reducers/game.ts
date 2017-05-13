import { createSelector } from 'reselect';
import { Game } from '../models/game';
import * as gameActions from '../actions/game';

export interface State {
    ids: string[],
    entities: { [id: string]: Game },
    selectedGameId: string | null
};

const initialState: State = {
    ids: [],
    entities: {},
    selectedGameId: null
};

export function reducer(state = initialState, action: gameActions.Actions): State {
    switch(action.type) {
        case gameActions.ActionTypes.LOAD_GAMES_SUCCESS: {
            const games = action['payload'];
            const newGames = games.filter(game => !state.entities[game.id]);

            const newGameIds = newGames.map(game => game.id);
            const newGameEntities = newGames.reduce((entities: { [id: string]: Game }, game: Game) => {
                return Object.assign(entities, {
                    [game.id]: game
                })
            }, {});

            return {
                ids: [...state.ids, ...newGameIds],
                entities: Object.assign({}, state.entities, newGameEntities),
                selectedGameId: state.selectedGameId
            };
        }
        default: {
            return state;
        }
    }
}

export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;
export const getSelectedId = (state: State) => state.selectedGameId;

export const getSelected = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
})