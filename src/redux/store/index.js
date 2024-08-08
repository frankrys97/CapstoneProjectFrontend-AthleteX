import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authenticateReducer from "../reducers/authenticateReducer"
import teamReducer from "../reducers/teamReducer";

const persistConfig = {
    key: 'root',
    storage
    // C'è la possibilità di aggiungere tra le opzione anche una whitelist ed una blacklist, a seconda
    // che si voglia o meno persistere solo alcuni o tutti i reducer
}

const rootReducer = combineReducers({
    // Qui ci vanno tutti i reducers normalmente
    authenticate: authenticateReducer,
    team: teamReducer
    });

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore ({ reducer: persistedReducer, middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),});

const persistor = persistStore(store)

export  { store, persistor }