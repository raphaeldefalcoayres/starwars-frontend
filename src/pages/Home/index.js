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
  const [loading, setLoading] = useState(false);
  const [countCharacters, setCountCharacters] = useState([]);

  async function loadCharacters() {
    setLoading(true);

    const response = await api.get('people');

    setCountCharacters(response.data.count);

    const data = response.data.results.map(character => {
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
      };
    });

    setLoading(false);
    setCharacters(data);
  }

  useEffect(() => {
    loadCharacters();
  }, []);

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
            <input type="text" placeholder="Search character" />
          </div>
        </Search>
      </Header>
      <Card className="card m-auto w-full">
        <CharacterList className="table table-auto table-row-bordered text-center table-hover table-stripped">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <Loading loading={loading} />
            {characters.map((character, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{character.name}</td>
                <td>{character.datetimeFormatted}</td>

                <td className="px-4 py-1 text-right">
                  <Link to={`/character/${index + 1}`}>
                    <a className="btn btn-primary">
                      <MdSearch color="#fff" size="20" />
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </CharacterList>
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
      </Card>
    </Container>
  );
}
