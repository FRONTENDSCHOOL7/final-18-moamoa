import styled from "styled-components";
import homeBg from '../../Assets/icons/character-yellow.png';

export const HomeWrap = styled.div`
  background-color: #fff;
  margin-top: 35px;
  margin-bottom: 60px;
  flex: 1;
`;
export const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
export const PostBg = styled.div`
  max-width: 39rem;
  height: 100%;
  margin: auto;
  background-color: #fff;
  @media (min-width: 768px) {
    max-width: 480px;
  }
`;

export const UserSearchHome = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;
export const HomeCont = styled.div`
  position: relative;
  height: 20.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  background: url(${homeBg}) 10.4rem 10.8rem no-repeat;
  background-position: 50% 35%;
  margin-top: 180px;
  @media (min-width: 768px) {
    background-position: 50% 35%;
  }
`;

export const SearchText = styled.p`
  font-size: 1.4rem;
  color: #767676;
`;

export const SearchBtn = styled.button`
  width: 12.2rem;
  height: 4.4rem;
  border-radius: 4.4rem;
  font-size: 1.4rem;
  background-color: var(--buttonActive);
  color: white;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;