import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdChevronLeft } from 'react-icons/md';
import { Container, Card } from './styles';
import Loading from '~/components/loading';
import api from '~/services/api';

export default function Character({ match: { params } }) {
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(false);
  async function loadCharacter() {
    setLoading(true);

    const response = await api.get(`people/${params.id}`);
    let specie = '';

    if (response.data.species) {
      specie = await api.get(response.data.species);
    }

    let homeworld = '';

    if (response.data.homeworld) {
      homeworld = await api.get(response.data.homeworld);
    }

    const films = await Promise.all(
      response.data.films.map(async film => {
        const result = await api.get(film);
        return result.data;
      })
    ).then(result => {
      return result;
    });

    const data = {
      ...response.data,
      specie: specie.data,
      homeworld: homeworld.data,
      listFilms: films,
    };

    setLoading(false);
    setCharacter(data);
  }

  useEffect(() => {
    loadCharacter();
  }, []); // eslint-disable-line

  return (
    <Container className="container h-full mx-auto py-5">
      <Card className="card m-auto">
        <Loading loading={loading} />
        <h1>Character {params.id}</h1>
        <ul>
          <li>
            <strong>Name:</strong> <span>{character.name}</span>
          </li>
          <li>
            <strong>Eye color:</strong> <span>{character.eye_color}</span>
          </li>
          <li>
            <strong>Hair color:</strong> <span>{character.hair_color}</span>
          </li>
          <li>
            <strong>Specie:</strong>{' '}
            <span>{character.specie ? character.specie.name : ''}</span>
          </li>
          <li>
            <strong>Homeworld:</strong>{' '}
            <span>{character.homeworld ? character.homeworld.name : ''}</span>
          </li>
          <li>
            <strong>Films:</strong>{' '}
            <span>
              {character.listFilms
                ? character.listFilms.map(film => film.title).join()
                : ''}
            </span>
          </li>
        </ul>
        <Link to="/" className="btn btn-primary btn-sm mt-3">
          <MdChevronLeft size="16" color="#fff" className="mr-1" /> Voltar
        </Link>
      </Card>
    </Container>
  );
}
