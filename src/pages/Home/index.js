import React, { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';
import * as Utils from '~/utils/getItemsList';
import Loading from '~/components/loading';

import { Container, CharacterList, Card, Paginate } from './styles';
import Header from '~/components/Header';

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [charactersPagination, setCharactersPagination] = useState([]);
  const [characterName, setCharacterName] = useState('');
  const [loading, setLoading] = useState(false);
  const [countCharacters, setCountCharacters] = useState(0);
  const [page, setPage] = useState(1);
  const [characterPlanet, setCharacterPlanet] = useState('');
  const [characterSpecie, setCharacterSpecie] = useState('');
  const [characterFilm, setCharacterFilm] = useState('');

  async function loadCharactersCache() {
    if (!localStorage.getItem('people')) {
      new Promise((resolve, reject) => {
        Utils.getItemsListPaginate('people/', [], resolve, reject);
      }).then(response => {
        setCharactersPagination(response);
        setCountCharacters(response.total);
        localStorage.setItem('people', JSON.stringify(response.data));
        localStorage.setItem('total', JSON.stringify(response.total));
      });
    } else {
      setCharactersPagination(JSON.parse(localStorage.getItem('people')));
      setCountCharacters(JSON.parse(localStorage.getItem('total')));
    }
  }

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
        let planet_id = '';
        let specie_ids = [];

        planet_id = character.homeworld.replace(/[^0-9\\]+/g, '');

        if (characterPlanet !== '' && characterPlanet !== planet_id) {
          return false;
        }

        if (character.species) {
          specie_ids = character.species.map(specie =>
            specie.replace(/[^0-9\\]+/g, '')
          );
        }

        if (characterSpecie !== '' && specie_ids.includes(characterSpecie)) {
          return false;
        }

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
          planet_id,
          specie_ids,
        };
      })
    ).then(result => {
      return result.filter(character => character !== false);
    });

    setLoading(false);
    setCharacters(data);
    console.log(data);
  }

  function mountCharacters() {
    const data = charactersPagination[page - 1].map(character => {
      let planet_id = '';
      let specie_ids = [];

      planet_id = character.homeworld.replace(/[^0-9\\]+/g, '');

      if (characterPlanet !== '' && characterPlanet !== planet_id) {
        return false;
      }

      if (character.species) {
        specie_ids = character.species.map(specie =>
          specie.replace(/[^0-9\\]+/g, '')
        );
      }

      if (characterSpecie !== '' && specie_ids.includes(characterSpecie)) {
        return false;
      }

      const createdFormatted = format(
        parseISO(character.created),
        'dd/MM/yyyy',
        {
          locale: pt,
        }
      );
      const editedFormatted = format(parseISO(character.edited), 'dd/MM/yyyy', {
        locale: pt,
      });
      return {
        ...character,
        createdFormatted,
        editedFormatted,
        planet_id,
        specie_ids,
      };
    });

    setLoading(false);
    setCharacters(data);
  }

  useEffect(() => {
    if (!localStorage.getItem('people')) {
      loadCharacters();
    }
    loadCharactersCache();
  }, []);

  useEffect(() => {
    if (charactersPagination[page] !== undefined) {
      mountCharacters();
    }
  }, [charactersPagination, page]);

  const delay = (() => {
    let timer = 0;
    return (callback, ms, that) => {
      clearTimeout(timer);
      timer = setTimeout(callback.bind(that), ms);
    };
  })();

  function handleSearchByName(e) {
    const target = e.target.value;
    delay(
      () => {
        setCharacterName(target);
      },
      1000,
      this
    );
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
    <>
      <Header
        handleSearchByName={handleSearchByName}
        handleFilterByPlanet={handleFilterByPlanet}
        handleFilterBySpecie={handleFilterBySpecie}
        handleFilterByFilm={handleFilterByFilm}
      />
      <Container className="px-3 h-full py-3">
        <Loading loading={loading} />
        <CharacterList className="w-full">
          <div className="list-head flex flex-row">
            <div className="py-2 w-1/12 content-center text-center self-center" />
            <div className="py-2 w-2/5 content-center text-center self-center">
              Name
            </div>
            <div className="py-2 w-1/6 content-center text-center self-center">
              Height
            </div>
            <div className="py-2 w-1/6 content-center text-center self-center">
              Mass
            </div>
            <div className="py-2 w-1/6 content-center text-center self-center">
              Hair color
            </div>
            <div className="py-2 w-1/6 content-center text-center self-center">
              Skin color
            </div>
            <div className="py-2 w-1/6 content-center text-center self-center">
              Eye color
            </div>
            <div className="py-2 w-1/6 content-center text-center self-center">
              Gender
            </div>
            <div className="py-2 w-1/6 content-center text-center self-center">
              Birth year
            </div>
            <div className="py-2 w-1/6 content-center text-center self-center">
              Total Films
            </div>
            <div className="py-2 w-1/6 content-center text-center self-center">
              Total Starships
            </div>
            <div className="py-2 w-1/6 content-center text-center self-center">
              Total veicles
            </div>
            <div className="py-2 w-1/6 content-center text-center self-center">
              Created
            </div>
            <div className="py-2 w-1/6 content-center text-center self-center">
              Edited
            </div>
            <div className="py-2 w-1/12 content-center text-center self-center" />
          </div>

          <div className="list-body">
            {characters
              .filter(item => item !== false)
              .map((character, index) => (
                <div
                  className="list-row flex flex-row rounded my-2 py-1/2"
                  key={index}
                >
                  <div className="list-col w-1/12 py-2 content-center text-center self-center">
                    {index + 1 + (page - 1) * 10}
                  </div>
                  <div className="list-col py-2 w-2/5 content-center text-center self-center">
                    {character.name}
                  </div>
                  <div className="list-col w-1/6 content-center text-center self-center">
                    {character.height}
                  </div>
                  <div className="list-col w-1/6 content-center text-center self-center">
                    {character.mass}
                  </div>
                  <div className="list-col w-1/6 content-center text-center self-center">
                    {character.hair_color}
                  </div>
                  <div className="list-col w-1/6 content-center text-center self-center">
                    {character.skin_color}
                  </div>
                  <div className="list-col w-1/6 content-center text-center self-center">
                    {character.eye_color}
                  </div>
                  <div className="list-col w-1/6 content-center text-center self-center">
                    {character.gender}
                  </div>
                  <div className="list-col w-1/6 content-center text-center self-center">
                    {character.birth_year}
                  </div>
                  <div className="list-col w-1/6 leading-3 content-center text-center self-center">
                    <small className="badge badge-primary">
                      {character.films.length}
                    </small>
                  </div>
                  <div className="list-col w-1/6 leading-3 content-center text-center self-center">
                    <small className="badge badge-primary">
                      {character.vehicles.length}
                    </small>
                  </div>
                  <div className="list-col w-1/6 leading-3 content-center text-center self-center">
                    <small className="badge badge-primary">
                      {character.starships.length}
                    </small>
                  </div>
                  <div className="list-col w-1/6 content-center text-center self-center">
                    {character.createdFormatted}
                  </div>
                  <div className="list-col w-1/6 content-center text-center self-center">
                    {character.editedFormatted}
                  </div>

                  <div className="list-col w-1/12 pl-4 py-1 text-right">
                    <Link
                      className="btn btn-sm btn-primary justify-end mr-2"
                      to={`/character/${index + 1}`}
                    >
                      <MdSearch color="#fff" size="20" />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </CharacterList>

        <div className="flex justify-between items-center">
          <small>
            page: {page} show: 10 total: {countCharacters || 0}
          </small>

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
        </div>
      </Container>
    </>
  );
}
