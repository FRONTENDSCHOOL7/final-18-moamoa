import styled from 'styled-components';

export const SearchListWrap = styled.ul`
  height: 100%;
  margin-top: 48px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 768px) {
    margin: 0 auto;
  }
  @media (min-width: 1200px) {
  }
`;
export const RecommendPlaceContainer = styled.div`
  @media (max-width: 1199px) {
    display: none;
  }
  position: absolute;
  top: 8.5%;
  right: 2.5%;
`;
