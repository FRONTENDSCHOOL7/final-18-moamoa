import styled from 'styled-components';
export const SearchListContainer = styled.section`
  height: 100%;

  @media (min-width: 768px) {
    margin: 0 auto;
    margin-top: 80px;
    min-width: 480px;
    padding-left: 120px;
  }

  @media (min-width: 1200px) {
    margin: 0;
    margin-top: 80px;
    display: flex;
    justify-content: space-between;
    padding-right: 30px;
    padding-left: 270px;
  }
`;
export const SearchListWrap = styled.div`
  height: 100%;
  @media (min-width: 1200px) {
    min-width: 480px;
  }
`;
export const SearchList = styled.ul`
  margin-top: 0px;
  padding: 16px;
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 768px) {
    padding: 16px;
    padding-top: 0px;
  }
`;

export const RecommendPlaceContainer = styled.div`
  display: none;

  @media (min-width: 1200px) {
    display: block;
  }
  > :nth-child(2) {
    height: auto;
  }
`;
