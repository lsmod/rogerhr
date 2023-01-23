import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemon/pokemonSlice";
import loginReducer from "./login/loginSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    auth: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
