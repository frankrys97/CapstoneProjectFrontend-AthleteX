import { GET_EVENTS_OF_TEAM, 
    GET_PLAYERS_OF_TEAM, SET_TEAM, 
    REMOVE_PLAYER_FROM_TEAM, 
    UPDATE_PLAYER_FROM_TEAM, 
    GET_PARTECIPATIONS_OF_TEAM,
UPDATE_PLAYER_IN_TEAM } from "../actions";

const initialState = {
    content: null,
    players: [],
    events: [],
    partecipations: []
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
                        case UPDATE_PLAYER_FROM_TEAM:
                            return {
                                ...state,
                                players: action.payload
                            }
                            case GET_PARTECIPATIONS_OF_TEAM:
                                return {
                                    ...state,
                                    partecipations: action.payload
                                }
                                case UPDATE_PLAYER_IN_TEAM:
                                    return {
                                        ...state,
                                        players: state.players.players.map((player) => player.id === action.payload.id ? action.payload : player),
                                    }
                          
        default:
            return state;
    }
};

export default teamReducer