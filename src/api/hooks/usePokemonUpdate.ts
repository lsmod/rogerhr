import { useDispatch, useSelector } from "react-redux";

import { Pokemon } from "../models/Pokemon";
import { AppDispatch, RootState } from "../../store/store";
import { updatePokemon } from "../../store/pokemon/pokemonSlice";

interface PokemonUpdateData {
  pokemon: Pokemon | null;
  update: (pokemon: Pokemon) => void;
  isLoading: boolean;
  error: any;
}

function usePokemonUpdate(): PokemonUpdateData {
  const pokemon = useSelector((state: RootState) => state.pokemon.item.item);
  const isLoading = useSelector(
    (state: RootState) => state.pokemon.item.loading
  );
  const error = useSelector((state: RootState) => state.pokemon.item.error);
  const dispatch = useDispatch<AppDispatch>();

  const update = (pokemon: Pokemon) => {
    dispatch(updatePokemon(pokemon));
  };

  return { pokemon, update, isLoading, error };
}

export default usePokemonUpdate;
