import styled from 'styled-components';

export const ProductSection = styled.section`
  @media (min-width: 1200px) {
    margin-top: 80px;
    display: flex;
    justify-content: space-between;

    padding-right: 30px;
  }
  .Recommend {
    display: none;
    @media (min-width: 1200px) {
      display: block;
    }
  }
  div.Recommend > :nth-child(2) {
    height: auto;
  }
`;
