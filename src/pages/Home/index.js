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
  const [countCharacters, setCountCharacters] = useState([]);

  async function loadCharacters() {
    setLoading(true);

    let search = '';

    if (characterName !== '') {
      search = `?search=${characterName}`;
    }

    const response = await api.get(`people/${search}`);

    setCountCharacters(response.data.count);

    const data = await Promise.all(
      response.data.results.map(async character => {
        const specie = await api.get(character.species);
        const homeworld = await api.get(character.homeworld);

        const films = await Promise.all(
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
          specie_data: specie.data,
          homeworld_data: homeworld.data,
          listFilms: films,
        };
      })
    ).then(result => {
      return result;
    });

    console.log(data);

    setLoading(false);
    setCharacters(data);
  }

  useEffect(() => {
    loadCharacters();
  }, [characterName]);

  function handleSearchByName(e) {
    console.log(e.target.value);
    setCharacterName(e.target.value);
  }

  return (
    <Container className="container h-full mx-auto py-5">
      <Header className="w-full">
        <h1>
          Startwars character list - showing {characters.length || 0} of{' '}
          {countCharacters || 0}{' '}
        </h1>
        <Search className="w-1/3">
          <div className="input-group">
            <div className="flex -mr-px">
              <span className="input-group-icon">
                <MdSearch />
              </span>
            </div>
            <input
              type="text"
              placeholder="Search character for name"
              onChange={e => handleSearchByName(e)}
            />
          </div>
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
            {characters.map((character, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
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
            <a href="#">Previous</a>
          </li>
          <li>
            <a href="#">1</a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a className="active" href="#">
              3
            </a>
          </li>
          <li>
            <a href="#">Next</a>
          </li>
        </ul>
      </Paginate>
    </Container>
  );
}
