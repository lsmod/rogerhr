import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";
import { fetchPokemons } from "../../store/pokemon/pokemonSlice";
import { PokemonListItem } from "../models/Pokemon/pokemonListItem";

const POKEMON_FETCH_LIMIT = parseInt(
  process.env.REACT_APP_POKEMON_FETCH_LIMIT || "5"
);

interface PokemonsFetchData {
  pokemons: PokemonListItem[] | null;
  isLoading: boolean;
  error: any;
  setOffet: (offset: number) => void;
}

export const usePokemonsFetch = (): PokemonsFetchData => {
  const pokemons = useSelector((state: RootState) => state.pokemon.items);
  const isLoading = useSelector((state: RootState) => state.pokemon.loading);
  const error = useSelector((state: RootState) => state.pokemon.error);
  const dispatch = useDispatch<AppDispatch>();

  const setOffet = (offset: number) => {
    dispatch(fetchPokemons({ offset, limit: POKEMON_FETCH_LIMIT }));
  };

  useEffect(() => {
    dispatch(fetchPokemons({ offset: 0, limit: POKEMON_FETCH_LIMIT }));
  }, [dispatch]);

  return { pokemons, isLoading, error, setOffet };
};
