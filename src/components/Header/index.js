import React, { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import api from '~/services/api';
import * as Utils from '~/utils/getItemsList';
import { Container, Search } from './styles';

export default function Header({
  handleSearchByName,
  handleFilterByPlanet,
  handleFilterBySpecie,
  handleFilterByFilm,
}) {
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [films, setFilms] = useState([]);

  async function loadPlanets() {
    if (!localStorage.getItem('planets')) {
      new Promise((resolve, reject) => {
        Utils.getItemsList('planets', [], resolve, reject);
      }).then(response => {
        setPlanets(response);
        localStorage.setItem('planets', JSON.stringify(response));
      });
    } else {
      setPlanets(JSON.parse(localStorage.getItem('planets')));
    }
  }
  async function loadSpecies() {
    if (!localStorage.getItem('planets')) {
      new Promise((resolve, reject) => {
        Utils.getItemsList('species', [], resolve, reject);
      }).then(response => {
        setSpecies(response);
        localStorage.setItem('species', JSON.stringify(response));
      });
    } else {
      setSpecies(JSON.parse(localStorage.getItem('species')));
    }
  }
  async function loadFilms() {
    if (!localStorage.getItem('films')) {
      const response = await api.get(`films`);
      setFilms(response.data.results);
      localStorage.setItem('films', JSON.stringify(response.data.results));
    } else {
      setFilms(JSON.parse(localStorage.getItem('films')));
    }
  }

  useEffect(() => {
    loadPlanets();
    loadSpecies();
    loadFilms();
  }, []);

  return (
    <Container className="w-full px-2 py-2 flex items-center shadow">
      <h1 className="text-white m-0">
        Startwars characters
        {/* <small>
          page: {page} total: {countCharacters || 0}
        </small> */}
      </h1>
      <Search className="w-2/3">
        <div className="input-group w-2/3">
          <div className="flex -mr-px">
            <span className="input-group-icon">
              <MdSearch />
            </span>
          </div>
          <input
            type="text"
            placeholder="Search by name..."
            onChange={e => handleSearchByName(e)}
          />
        </div>
        <select
          className="select-control"
          onChange={e => handleFilterByPlanet(e)}
        >
          <option value="">Planets</option>
          {planets.map((planet, index) => (
            <option
              key={planet.created}
              value={planet.url.replace(/[^0-9\\]+/g, '')}
            >
              {planet.name}
            </option>
          ))}
        </select>
        <select
          className="select-control"
          onChange={e => handleFilterBySpecie(e)}
        >
          <option value="">Specie</option>
          {species.map((specie, index) => (
            <option
              key={specie.created}
              value={specie.url.replace(/[^0-9\\]+/g, '')}
            >
              {specie.name}
            </option>
          ))}
        </select>
        <select
          className="select-control"
          onChange={e => handleFilterByFilm(e)}
        >
          <option value="">Film</option>
          {films.map((film, index) => (
            <option
              key={film.created}
              value={film.url.replace(/[^0-9\\]+/g, '')}
            >
              {film.title}
            </option>
          ))}
        </select>
      </Search>
    </Container>
  );
}
