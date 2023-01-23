import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pokemon } from "../../api/models/Pokemon";
import { PokemonListItem } from "../../api/models/Pokemon/pokemonListItem";
import apiClient from "../../api/apiClient";

export const fetchPokemon = createAsyncThunk<Pokemon, string>(
  "pokemon/fetchOne",
  async (name: string) => {
    const pokemon = await apiClient.getPokemonByName(name);
    return pokemon;
  }
);

export const updatePokemon = createAsyncThunk<Pokemon, Pokemon>(
  "pokemon/UpdateOne",
  async (pokemon: Pokemon) => {
    const updated = await apiClient.updatePokemon(pokemon);
    return updated;
  }
);

export const fetchPokemons = createAsyncThunk<
  PokemonListItem[],
  { offset: number; limit: number }
>("pokemon/fetchAll", async ({ offset, limit }) => {
  const pokemons = await apiClient.getPokemons(offset, limit);
  return pokemons;
});

type PokemonItem = {
  item: Pokemon | null;
  loading: boolean;
  error: boolean;
};

export interface PokemonState {
  item: PokemonItem;
  items: PokemonListItem[];
  loading: boolean;
  error: boolean;
}

const initialState: PokemonState = {
  item: {
    item: null,
    loading: false,
    error: false,
  },
  items: [],
  loading: false,
  error: false,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.item.loading = true;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.item.loading = false;
        state.item.item = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state) => {
        state.loading = false;
        state.item.error = true;
      })
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updatePokemon.pending, (state) => {
        state.item.loading = true;
      })
      .addCase(updatePokemon.fulfilled, (state, action) => {
        state.item.loading = false;
        state.item.item = action.payload;
      })
      .addCase(updatePokemon.rejected, (state) => {
        state.loading = false;
        state.item.error = true;
      });
  },
});

// export const {} = pokemonSlice.actions;

export default pokemonSlice.reducer;
