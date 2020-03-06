import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
`;
export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Search = styled.div`
  display: flex;
  position: relative;
  > * {
    margin-left: 10px;
  }
  font-size: 13px;
`;
export const CharacterList = styled.table`
  font-size: 13px;
`;
export const Card = styled.div`
  min-height: 440px;
`;
export const Paginate = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  align-self: end;
`;
