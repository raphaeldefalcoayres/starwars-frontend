import React from 'react';

import FlexListRow from './FlexListRow';

import { Container } from './styles';

export default function FlexList({ flexListCols, characters, page }) {
  return (
    <Container className="w-full">
      <div className="list-head">
        {flexListCols.map(item => (
          <div className={`${item.class} list-col`}>{item.label}</div>
        ))}
      </div>

      <div className="list-body">
        {characters
          .filter(item => item !== false)
          .map((character, index) => (
            <FlexListRow
              flexListCols={flexListCols}
              type={window.innerWidth < 996 ? 'mobile' : 'desktop'}
              index={index}
              character={character}
              page={page}
            />
          ))}
      </div>
    </Container>
  );
}
