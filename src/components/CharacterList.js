import React, { useEffect, useState } from "react";
import Axios from "axios";
import CharacterCard from "./CharacterCard";
import {Link} from "react-router-dom";

function CharacterList() {
  // TODO: Add useState to track data from useEffect
  const [character, setCharacter] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // TODO: Add API Request here - must run in `useEffect`
    Axios
      .get('https://rickandmortyapi.com/api/character/')
      .then(response => {

        const charSearch = response.data.results.filter(search =>
          search.name.toLowerCase().includes(query.toLowerCase())
        );
        console.log(response.data.results);
        setCharacter(charSearch);
        // setCharacter(response.data.results)
        // console.log(response.data.results)
      })
      .catch(error =>{
        console.error('Server error', error)
      })

    //  Important: verify the 2nd `useEffect` parameter: the dependancies array!
  }, [query]);
  const handleInputChange = event =>{
    setQuery(event.target.value);
  };

  return (
    <section className="character-list">
      <h2>TODO: `array.map()` over your state here!</h2>
      <div>
      <form>
        <input
        type = "text"
        onChange = {handleInputChange}
        value = {query}
        name = "name"
        tabIndex = "0"
        placeholder = "Find Character"
        autoComplete = "off"
        />
      </form>
    </div>

    <section className="character-list">
      
      <Link to= {"/"}>
      <button>Home</button>
      </Link>
      <div >
        {character.map(char => {

          return(
            <CharacterCard 
            key = {char.id} 
            image = {char.image}
            name = {char.name} 
            species={char.species} 
            status={char.status}
            location={char.location.name} /> 
          )
        })}    
      </div>

        <Link to= {"/Home"}>
      <button>Home</button>
      </Link>

    </section>
    </section>
  );
}
export default CharacterList;