import { GET_EVENTS_OF_TEAM, 
    GET_PLAYERS_OF_TEAM, SET_TEAM, 
    REMOVE_PLAYER_FROM_TEAM, 
    UPDATE_PLAYER_FROM_TEAM, 
    GET_PARTECIPATIONS_OF_TEAM,
UPDATE_PLAYER_IN_TEAM, 
ADD_EVENT_TO_TEAM,
UPDATE_EVENT_IN_TEAM,
DELETE_EVENT_FROM_TEAM, RESET_TEAM} from "../actions";

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
                                    case ADD_EVENT_TO_TEAM:
                                        return {
                                          ...state,
                                          events: [...state.events, action.payload],
                                        };
                                      case UPDATE_EVENT_IN_TEAM:
                                        return {
                                          ...state,
                                          events: state.events.map(event =>
                                            event.id === action.payload.id ? action.payload : event
                                          ),
                                        };
                                      case DELETE_EVENT_FROM_TEAM:
                                        return {
                                          ...state,
                                          events: state.events.filter(event => event.id !== action.payload),
                                        };
                                      case RESET_TEAM:
                                        return {
                                          content: null,
                                          players: [],
                                          events: [],
                                          partecipations: [],
                                        };
                          
        default:
            return state;
    }
};

export default teamReducer