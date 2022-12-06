import React from "react";
import styled from "@emotion/styled";
// import {CssBaseline} from "@mui/material";

import './App.css';

//import PokemonRow from "./components/PokemonRow";
import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
import PokemonContext from "./PokemonContext";

// Emotion styles
const Title = styled.h1`
  text-align: center;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;
const Container = styled.div`
  margin: auto;
  width: 800px,
  padding-top: 1rem;
`;

function App() {

  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState([]);
  const [selectedPokemon, selectedPokemonSet] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3000/APS-Renewal-Training-Plan/pokemon.json")
    .then(resp => resp.json())
    .then(data => pokemonSet(data));
  }, [])

  return (
    <PokemonContext.Provider
      value = {{
        filter,
        pokemon,
        selectedPokemon,
        filterSet,
        pokemonSet,
        selectedPokemonSet,
      }}
    >
      <Container>
        <Title>Pokemon Search</Title>
        <PokemonFilter
          filter = {filter}
          filterSet = {filterSet}
        />

        <TwoColumnLayout>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>

            {<PokemonInfo {...selectedPokemon}/>}

        </TwoColumnLayout>
        
      </Container>
    </PokemonContext.Provider>
  );
}

export default App;
