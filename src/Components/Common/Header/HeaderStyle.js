import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  height: 48px;
  z-index: 5;

  position: fixed;
  min-height: 48px;
  max-height: 48px;
  // width: 390px;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  img {
    cursor: pointer;
  }
  @media (min-width: 768px) {
    display: none;
  }

  left: 50%;
  transform: translate(-50%, 0);
`;
export const H1 = styled.h1`
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`;
export const SearchBtn = styled.img`
  width: 2.2rem;
`;
export const HomeBtn = styled.img`
  width: 13rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const HeaderFollowContainer = styled.div`
  display: flex;
  height: 48px;
  position: fixed;
  min-height: 48px;
  max-height: 48px;
  width: 100%;
  gap: 8px;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
  align-items: center;
  font-size: 16px;
  padding-left: 16px;
  box-sizing: border-box;
  margin-bottom: 8px;
  @media (min-width: 768px) {
    display: none;
  }
`;
export const ChatUserName = styled.h2`
  font-weight: 500;
  font-size: 1.8rem;
`;
export const HeaderSearchContainer = styled.header`
  display: flex;
  justify-content: center;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  width: 100%;
  position: fixed;
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 10px;
  input::-webkit-search-cancel-button {
    padding-right: 10px;
    cursor: pointer;
  }
  img {
    cursor: pointer;
    padding-right: 8px;
    padding-bottom: 2px;
  }
  input {
    background-color: #f2f2f2;
    flex: 1;
    width: 340px;
    height: 32px;
    border-radius: 32px;
    padding-left: 20px;
    box-sizing: border-box;
    &:focus {
      outline: none;
      border: 1px solid #797979;
    }
  }
  @media (min-width: 768px) {
    position: static;
    border: none;
    padding: 0;
    margin-top: 80px;
    margin-inline: auto;
    input {
    }
    img {
      display: none;
    }
  }
  @media (min-width: 1200px) {
    left: 40%;
    transform: translateX(-30%);
  }
`;
