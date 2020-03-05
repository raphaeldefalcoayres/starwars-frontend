import React from 'react';

import { Container } from './styles';

export default function loading({ loading }) {
  return (
    <Container>
      <svg
        className={loading ? 'spinner' : 'spinner hidden'}
        viewBox="0 0 100 100"
        width="20"
        height="20"
      >
        <circle cx="50" cy="50" r="42" transform="rotate(-90,50,50)" />
      </svg>
    </Container>
  );
}
