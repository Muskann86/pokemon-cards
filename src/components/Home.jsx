import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [id, setId] = useState(1);
  const { isLogged } = useContext(UserContext);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((results) => {
        setPokemon(results);
      });
  }, [id]);
  console.log(pokemon);

  function randomNumber() {
    return Math.floor(Math.random() * 151) + 1;
  }

  return (
    <div className="d-grid justify-content-center container">
      {isLogged ? <div className="card my-3 rounded border-dark" style={{ width: "18rem"}}>
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            className="card-img-top"
            alt="Pokémon"
          />
          <div className="card-body">
            <h5 className="card-title fw-bold fs-3 text-capitalize">
              Name : {pokemon?.name}
            </h5>
            <ul className="list-unstyled">
              <li className="card-text fw-bold fs-3">
                Height : {pokemon?.height}
              </li>
              <li className="card-text fw-bold fs-3">
                Weight : {pokemon?.weight}
              </li>
            </ul>
            <ul className="list-group list-group-flush">
              {pokemon?.types.map((type) => (
                <li className="card-footer list-group-item text-capitalize fw-bold fs-2">
                  Type : {type.type.name}
                </li>
              ))}
            </ul>
          <button
            onClick={() => setId(randomNumber)}
            className="btn btn-lg d-grid gap-2 mx-auto fw-bold fs-5 text-white text-uppercase"
            style={{ backgroundColor: "purple" }}
          >
            Get a pokemon
          </button>
          </div>
        </div>
       : 
       <Link to="/login" className="fw-bold fs-2 text-uppercase">You need to be Logged in</Link> 
      }
    </div>
  );
}

export default Home;
