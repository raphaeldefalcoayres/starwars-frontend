import React, { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';
import * as Utils from '~/utils/getItemsList';
import Loading from '~/components/loading';

import {
  Container,
  Header,
  Search,
  CharacterList,
  Card,
  Paginate,
} from './styles';

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [characterName, setCharacterName] = useState('');
  const [loading, setLoading] = useState(false);
  const [countCharacters, setCountCharacters] = useState(0);
  const [page, setPage] = useState(1);
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [films, setFilms] = useState([]);
  const [characterPlanet, setCharacterPlanet] = useState('');
  const [characterSpecie, setCharacterSpecie] = useState('');
  const [characterFilm, setCharacterFilm] = useState('');

  async function loadCharacters() {
    setLoading(true);

    let search = '';

    if (characterName !== '') {
      search = `&search=${characterName}`;
    }

    const response = await api.get(`people/?page=${page}${search}`);

    setCountCharacters(response.data.count);

    const data = await Promise.all(
      response.data.results.map(async character => {
        const createdFormatted = format(
          parseISO(character.created),
          'dd/MM/yyyy',
          {
            locale: pt,
          }
        );
        const editedFormatted = format(
          parseISO(character.edited),
          'dd/MM/yyyy',
          {
            locale: pt,
          }
        );
        return {
          ...character,
          createdFormatted,
          editedFormatted,
        };
      })
    ).then(result => {
      return result;
    });

    setLoading(false);
    setCharacters(data);
    console.log(data);
  }

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
    loadCharacters();
  }, [characterName, page, characterPlanet, characterSpecie, characterFilm]); // eslint-disable-line

  useEffect(() => {
    loadPlanets();
    loadSpecies();
    loadFilms();
  }, []);

  function handleSearchByName(e) {
    setCharacterName(e.target.value);
  }

  function goToPage(pageNum) {
    setPage(pageNum);
  }

  function handleFilterByPlanet(e) {
    setCharacterPlanet(e.target.value);
  }
  function handleFilterBySpecie(e) {
    setCharacterSpecie(e.target.value);
  }
  function handleFilterByFilm(e) {
    setCharacterFilm(e.target.value);
  }

  return (
    <Container className="container h-full mx-auto py-5">
      <Header className="w-full">
        <h1>
          Startwars characters -{' '}
          <small>
            page: {page} total: {countCharacters || 0}
          </small>
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
              <option key={planet.created} value={index + 1}>
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
              <option key={specie.created} value={index + 1}>
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
              <option key={film.created} value={index + 1}>
                {film.title}
              </option>
            ))}
          </select>
        </Search>
      </Header>
      <Card className="card m-auto w-full relative">
        <Loading loading={loading} />
        <CharacterList className="table table-auto table-row-bordered text-center table-hover table-stripped">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2 w-2/3">Name</th>
              <th className="px-4 py-2">Height</th>
              <th className="px-4 py-2">Mass</th>
              <th className="px-4 py-2">Hair color</th>
              <th className="px-4 py-2">Skin color</th>
              <th className="px-4 py-2">Eye color</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">Birth year</th>
              <th className="px-4 py-2">Total Films</th>
              <th className="px-4 py-2">Total Starships</th>
              <th className="px-4 py-2">Total veicles</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Edited</th>
              <th className="px-4 py-2 w-16" />
            </tr>
          </thead>
          <tbody>
            {characters
              .filter(item => item !== false)
              .map((character, index) => (
                <tr key={index}>
                  <td>{index + 1 + (page - 1) * 10}</td>
                  <td>{character.name}</td>
                  <td>{character.height}</td>
                  <td>{character.mass}</td>
                  <td>{character.hair_color}</td>
                  <td>{character.skin_color}</td>
                  <td>{character.eye_color}</td>
                  <td>{character.gender}</td>
                  <td>{character.birth_year}</td>
                  <td className="leading-3">
                    <small className="badge badge-primary">
                      {character.films.length}
                    </small>
                  </td>
                  <td className="leading-3">
                    <small className="badge badge-primary">
                      {character.vehicles.length}
                    </small>
                  </td>
                  <td className="leading-3">
                    <small className="badge badge-primary">
                      {character.starships.length}
                    </small>
                  </td>
                  <td>{character.createdFormatted}</td>
                  <td>{character.editedFormatted}</td>

                  <td className="px-4 py-1 text-right">
                    <Link
                      className="btn btn-sm btn-primary justify-end"
                      to={`/character/${index + 1}`}
                    >
                      <MdSearch color="#fff" size="20" />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </CharacterList>
      </Card>
      <Paginate className="paginate">
        <ul>
          <li>
            <button
              type="button"
              onClick={() => goToPage(page > 1 ? page - 1 : page)}
            >
              Previous
            </button>
          </li>
          <li className="active">{page}</li>
          <li>
            <button
              type="button"
              onClick={() =>
                goToPage(page < countCharacters / 10 ? page + 1 : page)
              }
            >
              Next
            </button>
          </li>
        </ul>
      </Paginate>
    </Container>
  );
}
