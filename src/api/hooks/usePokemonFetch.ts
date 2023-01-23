import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Pokemon } from "../models/Pokemon";
import { AppDispatch, RootState } from "../../store/store";
import { fetchPokemon } from "../../store/pokemon/pokemonSlice";

interface PokemonFetchData {
  pokemon: Pokemon | null;
  isLoading: boolean;
  error: any;
}

function usePokemonFetch(name: string): PokemonFetchData {
  const pokemon = useSelector((state: RootState) => state.pokemon.item.item);
  const isLoading = useSelector(
    (state: RootState) => state.pokemon.item.loading
  );
  const error = useSelector((state: RootState) => state.pokemon.item.error);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPokemon(name));
  }, [name, dispatch]);

  return { pokemon, isLoading, error };
}

export default usePokemonFetch;
