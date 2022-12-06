import React, {useContext} from 'react';
import PokemonContext from '../PokemonContext';
import PokemonType from "../PokemonType";

const PokemonInfo = () => {
const {
    state: {selectedPokemon }
} = useContext(PokemonContext);
    return selectedPokemon ? (
        <div>
            <h2>{selectedPokemon.name.english}</h2>
            <table>
            {
                Object.keys(selectedPokemon.base).map(key=> (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{selectedPokemon[key]}</td>
                </tr>
                ))
            }
            </table>
        </div>
    ) : null;
};

PokemonInfo.propTypes = PokemonType;

export default PokemonInfo;