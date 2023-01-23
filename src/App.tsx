import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/login/LoginPage";
import PokemonListPage from "./pages/pokemon/PokemonListPage";
import PokemonViewPage from "./pages/pokemon/PokemonViewPage";

import useAuth from "./api/hooks/useAuth";
import PokemonEditPage from "./pages/pokemon/PokemonEditPage";
import PageLayout from "./components/PageLayout";

type RequiredAuthProps = {
  children: JSX.Element;
};

const RequiredAuth: React.FC<RequiredAuthProps> = ({ children }) => {
  const { hasSignin } = useAuth();
  const location = useLocation();

  if (!hasSignin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/pokemons"
            element={
              <RequiredAuth>
                <PokemonListPage />
              </RequiredAuth>
            }
          />
          <Route
            path="/pokemon/edit"
            element={
              <RequiredAuth>
                <PokemonEditPage />
              </RequiredAuth>
            }
          />
          <Route
            path="/pokemon/:pokemonName"
            element={
              <RequiredAuth>
                <PokemonViewPage />
              </RequiredAuth>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
