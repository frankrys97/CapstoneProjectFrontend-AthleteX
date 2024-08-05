import { GET_EVENTS_OF_TEAM, GET_PLAYERS_OF_TEAM, SET_TEAM, REMOVE_PLAYER_FROM_TEAM } from "../actions";

const initialState = {
    content: null,
    players: [],
    events: []
};

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEAM:
            return {
                ...state,
                content: action.payload,
            };
            case GET_PLAYERS_OF_TEAM:
                return {
                    ...state,
                    players: action.payload
                }
                case GET_EVENTS_OF_TEAM:
                    return {
                        ...state,
                        events: action.payload
                    }
                    case REMOVE_PLAYER_FROM_TEAM:
                        console.log(action.payload)
                        console.log(state.players)
                        return {
                            ...state,
                            players: state.players.players.filter(player => player.id !== action.payload),
                        };
        default:
            return state;
    }
};

export default teamReducer