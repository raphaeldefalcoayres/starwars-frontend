import styled from 'styled-components';

export const Container = styled.div`
  @-webkit-keyframes spin {
    to {
      stroke-dashoffset: -264;
    }
  }

  @keyframes spin {
    to {
      stroke-dashoffset: -264;
    }
  }

  .spinner {
    left: 50%;
    top: 50%;
    position: absolute;
  }

  .spinner circle {
    fill: none;
    stroke: slategray;
    stroke-width: 16;
    stroke-linecap: round;
    stroke-dasharray: 0, 0, 70, 194;
    stroke-dashoffset: 0;
    animation: spin 1s infinite linear;
    -webkit-animation: spin 1s infinite linear;
  }
`;
