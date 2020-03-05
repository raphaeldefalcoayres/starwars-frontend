import React from 'react';
import { MdSearch } from 'react-icons/md';

import { Container, Header, Search, CharacterList, Card } from './styles';

export default function Home() {
  return (
    <Container className="container h-full mx-auto py-5">
      <Header class="w-full">
        <h1>Startwars character list (0)</h1>
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
            <tr>
              <td className="px-4 py-1">1</td>
              <td className="px-4 py-1">Luke Skywalker</td>
              <td className="px-4 py-1">2014-12-09T13:50:51.644000Z</td>
              <td className="px-4 py-1 text-right">
                <a href="/character/1" className="btn btn-primary">
                  <MdSearch color="#fff" size="20" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1">1</td>
              <td className="px-4 py-1">Luke Skywalker</td>
              <td className="px-4 py-1">2014-12-09T13:50:51.644000Z</td>
              <td className="px-4 py-1 text-right">
                <a href="/character/1" className="btn btn-primary">
                  <MdSearch color="#fff" size="20" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1">1</td>
              <td className="px-4 py-1">Luke Skywalker</td>
              <td className="px-4 py-1">2014-12-09T13:50:51.644000Z</td>
              <td className="px-4 py-1 text-right">
                <a href="/character/1" className="btn btn-primary">
                  <MdSearch color="#fff" size="20" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1">1</td>
              <td className="px-4 py-1">Luke Skywalker</td>
              <td className="px-4 py-1">2014-12-09T13:50:51.644000Z</td>
              <td className="px-4 py-1 text-right">
                <a href="/character/1" className="btn btn-primary">
                  <MdSearch color="#fff" size="20" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1">1</td>
              <td className="px-4 py-1">Luke Skywalker</td>
              <td className="px-4 py-1">2014-12-09T13:50:51.644000Z</td>
              <td className="px-4 py-1 text-right">
                <a href="/character/1" className="btn btn-primary">
                  <MdSearch color="#fff" size="20" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1">1</td>
              <td className="px-4 py-1">Luke Skywalker</td>
              <td className="px-4 py-1">2014-12-09T13:50:51.644000Z</td>
              <td className="px-4 py-1 text-right">
                <a href="/character/1" className="btn btn-primary">
                  <MdSearch color="#fff" size="20" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1">1</td>
              <td className="px-4 py-1">Luke Skywalker</td>
              <td className="px-4 py-1">2014-12-09T13:50:51.644000Z</td>
              <td className="px-4 py-1 text-right">
                <a href="/character/1" className="btn btn-primary">
                  <MdSearch color="#fff" size="20" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1">1</td>
              <td className="px-4 py-1">Luke Skywalker</td>
              <td className="px-4 py-1">2014-12-09T13:50:51.644000Z</td>
              <td className="px-4 py-1 text-right">
                <a href="/character/1" className="btn btn-primary">
                  <MdSearch color="#fff" size="20" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1">1</td>
              <td className="px-4 py-1">Luke Skywalker</td>
              <td className="px-4 py-1">2014-12-09T13:50:51.644000Z</td>
              <td className="px-4 py-1 text-right">
                <a href="/character/1" className="btn btn-primary">
                  <MdSearch color="#fff" size="20" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1">1</td>
              <td className="px-4 py-1">Luke Skywalker</td>
              <td className="px-4 py-1">2014-12-09T13:50:51.644000Z</td>
              <td className="px-4 py-1 text-right">
                <a href="/character/1" className="btn btn-primary">
                  <MdSearch color="#fff" size="20" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1">1</td>
              <td className="px-4 py-1">Luke Skywalker</td>
              <td className="px-4 py-1">2014-12-09T13:50:51.644000Z</td>
              <td className="px-4 py-1 text-right">
                <a href="/character/1" className="btn btn-primary">
                  <MdSearch color="#fff" size="20" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1">1</td>
              <td className="px-4 py-1">Luke Skywalker</td>
              <td className="px-4 py-1">2014-12-09T13:50:51.644000Z</td>
              <td className="px-4 py-1 text-right">
                <a href="/character/1" className="btn btn-primary">
                  <MdSearch color="#fff" size="20" />
                </a>
              </td>
            </tr>
          </tbody>
        </CharacterList>
      </Card>
    </Container>
  );
}
