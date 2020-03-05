import React, { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';
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
        let specie = 'not found';

        if (character.species.length) {
          specie = await api.get(character.species);
          specie = specie.data;

          if (characterSpecie !== '') {
            console.log(specie.name, characterSpecie);
            if (specie.name !== characterSpecie) {
              return false;
            }
          }
        }

        let homeworld = 'not found';

        if (character.homeworld.length) {
          homeworld = await api.get(character.homeworld);
          homeworld = homeworld.data;

          if (characterPlanet !== '') {
            console.log(homeworld.name, characterPlanet);
            if (homeworld.name !== characterPlanet) {
              return false;
            }
          }
        }

        const listFilms = await Promise.all(
          character.films.map(async film => {
            const result = await api.get(film);
            return result.data;
          })
        ).then(result => {
          return result;
        });

        const datetimeFormatted = format(
          parseISO(character.created),
          "d 'de' MMMM, 'às' HH'h'",
          {
            locale: pt,
          }
        );
        return {
          ...character,
          datetimeFormatted,
          specie_data: specie,
          homeworld_data: homeworld,
          listFilms,
        };
      })
    ).then(result => {
      return result;
    });

    console.log(data);

    setLoading(false);
    setCharacters(data);
  }

  async function loadPlanets() {
    const response = await api.get(`planets`);
    setPlanets(response.data.results);
  }
  async function loadSpecies() {
    const response = await api.get(`species`);
    setSpecies(response.data.results);
  }
  async function loadFilms() {
    const response = await api.get(`films`);
    setFilms(response.data.results);
  }

  useEffect(() => {
    loadCharacters();
  }, [characterName, page, characterPlanet, characterSpecie, characterFilm]);

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
              <option key={planet.name} value={planet.name}>
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
              <option key={specie.nam} value={specie.name}>
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
              <option key={film.name} value={film.name}>
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
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Homeworld</th>
              <th className="px-4 py-2">Specie</th>
              <th className="px-4 w-1/3 py-2">Films</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {characters
              .filter(item => item !== false)
              .map((character, index) => (
                <tr key={index}>
                  <td>{index + 1 + (page - 1) * 10}</td>
                  <td>{character.name}</td>
                  <td>{character.homeworld_data.name}</td>
                  <td>{character.specie_data.name}</td>
                  <td className="leading-3">
                    <small>
                      {character.listFilms
                        ? character.listFilms.map(film => film.title).join()
                        : ''}
                    </small>
                  </td>
                  <td>{character.datetimeFormatted}</td>

                  <td className="px-4 py-1 text-right">
                    <Link
                      className="btn btn-primary justify-end"
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
