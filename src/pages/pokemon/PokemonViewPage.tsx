import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import usePokemonFetch from "../../api/hooks/usePokemonFetch";
import PageLoader from "../../components/PageLoader";

const PokemonViewPage = () => {
  const { pokemonName } = useParams();
  const { pokemon, isLoading, error } = usePokemonFetch(pokemonName as string);
  const navigate = useNavigate();

  const clickOnEdit = () => {
    navigate("/pokemon/edit");
  };

  if (isLoading) {
    return <PageLoader />;
  }
  if (error) {
    return <div>error!</div>;
  }

  return (
    <Box>
      <Button onClick={clickOnEdit}>edit</Button>
      Name: {pokemon?.name}
      {pokemon?.sprites.front_default && (
        <img src={pokemon.sprites.front_default} alt="pokemon face" />
      )}
      {pokemon?.sprites.back_default && (
        <img src={pokemon.sprites.back_default} alt="pokemon back" />
      )}
    </Box>
  );
};

export default PokemonViewPage;
