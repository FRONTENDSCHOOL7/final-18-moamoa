import styled from 'styled-components';

export const ProductListWrap = styled.div`
  background-color: #fff;
  margin-top: 48px;
  @media (min-width: 768px) {
    margin-top: 80px;
  }
`;

export const FestivalContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  overflow: hidden;
  margin: 0 auto;
  max-width: 480px;

  @media (min-width: 768px) {
    max-width: 480px;
    padding-left: 120px;
  }
  @media (min-width: 1200px) {
    padding-left: 240px;
  }
`;
export const FestivalArticle = styled.article`
  margin-top: 4.8rem;
  margin-bottom: 7.6rem;

  @media (min-width: 480px) {
    margin-left: 0rem;
    margin-right: 0rem;
  }
  @media (min-width: 768px) {
    margin-top: 80px;
  }
`;
export const Frofile = styled.div`
  height: 4.2rem;
  padding: 0.7rem 1.2rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 768px) {
    padding: 0 0 0.7rem 0;
  }
`;
