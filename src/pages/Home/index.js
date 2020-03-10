import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import api from '~/services/api';
import * as Utils from '~/utils/getItemsList';
import Loading from '~/components/loading';

import { Container, Paginate } from './styles';
import Header from '~/components/Header';
import FlexList from '~/components/FlexList';
import Badge from '~/components/Badge';

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
      response.data.results.map(async (character, index) => {
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
          index: index + 1,
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
    const data = charactersPagination[page - 1].map((character, index) => {
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
        index: index + 1 + (page - 1) * 10,
        createdFormatted,
        editedFormatted,
        planet_id,
        specie_ids,
        total_veicles: <Badge>{character.vehicles.length}</Badge>,
        total_starships: <Badge>{character.starships.length}</Badge>,
        total_films: <Badge>{character.films.length}</Badge>,
        actions: (
          <Link
            className="btn btn-sm btn-primary justify-end mr-2"
            to={`/character/${index + 1}`}
          >
            <MdSearch color="#fff" size="20" />
          </Link>
        ),
      };
    });

    setLoading(false);
    setCharacters(data);
    console.log(data);
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

  const flexListCols = [
    {
      label: '',
      name: 'index',
      class: 'md:w-1/12',
    },
    {
      label: 'Nome',
      name: 'name',
      class: 'md:w-2/5',
    },
    {
      label: 'Altura',
      name: 'height',
      class: 'md:w-1/6',
    },
    {
      label: 'Massa',
      name: 'mass',
      class: 'md:w-1/6',
    },
    {
      label: 'Cor do cabelo',
      name: 'hair_color',
      class: 'md:w-1/6',
    },
    {
      label: 'Cor da pele',
      name: 'skin_color',
      class: 'md:w-1/6',
    },
    {
      label: 'Cor dos olhos',
      name: 'eye_color',
      class: 'md:w-1/6',
    },
    {
      label: 'Gênero',
      name: 'gender',
      class: 'md:w-1/6',
    },
    {
      label: 'Ano',
      name: 'birth_year',
      class: 'md:w-1/6',
    },
    {
      label: 'Total Filmes',
      name: 'total_films',
      class: 'md:w-1/6',
    },
    {
      label: 'Total Naves',
      name: 'total_starships',
      class: 'md:w-1/6',
    },
    {
      label: 'Total Veículos',
      name: 'total_veicles',
      class: 'md:w-1/6',
    },
    {
      label: 'Criado em',
      name: 'createdFormatted',
      class: 'md:w-1/6',
    },
    {
      label: 'Editado em',
      name: 'editedFormatted',
      class: 'md:w-1/6',
    },
    {
      label: '',
      name: 'actions',
      class: 'md:w-1/12',
    },
  ];

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

        <FlexList
          flexListCols={flexListCols}
          characters={characters}
          page={page}
        />

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
