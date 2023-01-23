import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import { Button, List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { usePokemonsFetch } from "../../api/hooks/usePokemonsFetch";
import PageLoader from "../../components/PageLoader";

const POKEMON_PAGE_SIZE = parseInt(
  process.env.REACT_APP_POKEMON_FETCH_LIMIT || "5"
);

const PokemonListPage = () => {
  const { pokemons, isLoading, error, setOffet } = usePokemonsFetch();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const pageSize = POKEMON_PAGE_SIZE;

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    setOffet(newPage * pageSize);
  };

  const handlePrevPage = () => {
    const newPage = page - 1;
    setPage(newPage);
    setOffet(newPage * pageSize);
  };

  if (isLoading) {
    return <PageLoader />;
  }
  if (error) {
    return <div>error!</div>;
  }
  if (!pokemons || pokemons?.length === 0) {
    return <div>no pokemon!</div>;
  }

  return (
    <Box>
      <List>
        {pokemons.map((pokemon) => {
          return (
            <ListItem key={pokemon.name}>
              <ListItemButton
                onClick={() => navigate(`/pokemon/${pokemon.name}`)}
              >
                <ListItemText primary={`${pokemon.name}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Button onClick={handlePrevPage} disabled={page === 0}>
        Previous Page
      </Button>
      <Button onClick={handleNextPage}>Next Page</Button>
    </Box>
  );
};

export default PokemonListPage;
