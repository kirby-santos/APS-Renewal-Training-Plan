import React from "react";
import styled from "@emotion/styled";

import './App.css';

import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
import PokemonContext from "./PokemonContext";

const pokemonReducer = (state, action) => {
  switch(action.type) {
    case 'SET_FILTER':
      return {
       ...state,
        filter: action.payload,
      };
    case 'SET_POKEMON':
      return {
        ...state,
        pokemon: action.payload,
      };
    case 'SET_SELECTED_POKEMON':
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    default:
      throw new Error("No action");
  }
};

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
  const [state, dispatch] = React.useReducer(pokemonReducer, {
    pokemon: [],
    filter: "",
    selectedPokemon: null,
  });

  React.useEffect(() => {
    fetch("http://localhost:3000/APS-Renewal-Training-Plan/pokemon.json")
    .then(resp => resp.json())
    .then(data => dispatch({
      type: 'SET_POKEMON',
      payload: data,
  }), [])});

  if(!state.pokemon) {
    return <div>Loading data</div>;
  }

  return (
    <PokemonContext.Provider
      value = {{
        state,
        dispatch,
      }}
    >
      <Container>
        <Title>Pokemon Search</Title>
        <PokemonFilter
          filter = {state.filter}
          filterSet = {state.filterSet}
        />

        <TwoColumnLayout>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>

            {<PokemonInfo {...state.selectedPokemon}/>}

        </TwoColumnLayout>
        
      </Container>
    </PokemonContext.Provider>
  );
};

export default App;
