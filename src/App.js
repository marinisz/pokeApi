import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
import Images from 'pokemon-images'

function App() {
  const [pokemon,setPokemon] = useState([]);
  const [position,setPosition] = useState(0);

  async function getPokemon() {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
      console.log(response.data.results)

      setPokemon([...pokemon,{
        name:response.data.results[position].name,
        location:response.data.results[position].url
      }]);
      setPosition(position+1);
      console.log(pokemon)
      show()
    } catch (error) {
      console.error(error);
    }
    
  }


  async function pokeInfo(name){
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      alert('hey')
      document.getElementById("pokes").addEventListener("click", function() {
        alert(response.data)
      });
    } catch (error) {
      console.error(error);
    }
    
  }

  function show(){
    let output = ''
    for(let poke of pokemon){
      let img = Images.getSprite(poke.name);
      console.log(img)
      output+=`<a id="pokes" onClick="alert('${poke.name}')"  style="display:flex;flex-direction:column;border:2px solid black;margin:10px;border-radius: 10px;background-color:white;cursor:pointer;flex-basis: 25%;flex-grow: 1;align-items: center;justify-content: center;text-decoration:none;color:black">${poke.name} <img src=${img} alt=""></a>`
    }
    if(document.getElementById('pokeImg')!=null){
      document.getElementById('pokeImg').innerHTML = output
    }
    
}

  return (
  <main>
  <button onClick={getPokemon}>Add Pokemon</button>
  <div id="container">
    <div id="pokeImg">

    </div>
  </div>
  </main>
  );
}

export default App;
