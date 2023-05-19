import { configureStore , getDefaultMiddleware} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

// persistStore: The persistStore function is used to create a persisted version of the Redux store.
//  It takes the Redux store as an argument and returns a persistor object. The persistor object provides 
//  methods for controlling the persistence process, such as persistor.persist() to trigger the actual 
//  storing of the state and persistor.purge() to remove the persisted state.

// persistReducer: The persistReducer function is used to wrap your root reducer with persistence functionality.
//  It takes a configuration object and the root reducer as arguments and returns a new reducer. The configuration 
//  object specifies how and where the state should be persisted, including options like the storage system,
//   whitelist/blacklist of reducers to persist, and transformation functions.

// Handling state rehydration: The newly created reducer, which includes the persistence logic, automatically
//  handles the state rehydration process. When the application restarts, the persisted state is retrieved from 
//  the storage system, and the wrapped reducer uses this persisted state as the initial state of the Redux store.
//   This ensures that the application starts with the previously saved state, preserving the user's data and interactions.

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: getDefaultMiddleware({ 
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
