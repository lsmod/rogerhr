import axios, { AxiosInstance } from "axios";

import { Pokemon } from "./models/Pokemon/pokemon";
import { PokemonListItem } from "./models/Pokemon/pokemonListItem";

const BASE_URL = process.env.REACT_APP_POKEMON_API;

class Api {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
    });
  }

  public async login(email: string, password: string): Promise<any> {
    // const url = `${BASE_URL}/login`;

    /* const response = await axios.post(url, { email, password });
    this.axiosInstance = axios.create({
      baseURL: url,
      headers: {
        Authorization: `Bearer ${response.data.token}`,
      },
    });

    return response.data;*/

    // TODO only wrongs with proper credentials
    // TODO: update instance instead of creating a new one
    // pokeapi doesn't have authentification so let's fake it
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer FAKE_TOKEN`,
      },
    });
  }

  public async getPokemonByName(name: string): Promise<Pokemon> {
    const response = await this.axiosInstance.get(`/pokemon/${name}`);
    return response.data as Pokemon;
  }

  public async getPokemons(
    offset: number,
    limit: number
  ): Promise<PokemonListItem[]> {
    const response = await this.axiosInstance.get(
      `/pokemon?limit=${limit}&offset=${offset}`
    );
    return response.data.results as PokemonListItem[];
  }

  // updatePokemon
  public async updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    /** pokeapi is read only and don't provide any put endpoint
    const response = await this.axiosInstance.put(`/pokemon/${pokemon.name}`, {
      pokemon,
    });
    return response.data as Pokemon;*/

    // let's fake our API call ↓
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pokemon);
      }, 500);
    });
  }
}

export default Api;
