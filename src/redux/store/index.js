import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage
    // C'è la possibilità di aggiungere tra le opzione anche una whitelist ed una blacklist, a seconda
    // che si voglia o meno persistere solo alcuni o tutti i reducer
}

const rootReducer = combineReducers({
    // Qui ci vanno tutti i reducers normalmente
    });

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore ({ reducer: persistedReducer });

const persistor = persistStore(store)

export  { store, persistor }