/*
  설명: 프로필 수정 페이지 사용된 css
  작성자: 이해지
  최초 작성 날짜: 2023.02.03
  마지막 수정 날까: 2023.02.13
*/

import styled from 'styled-components';

export const ProfileImg = styled.div`
  margin-top: 48px;
  background: linear-gradient(to bottom, #ffc700 50%, #ffc700 calc(30% + 65px), transparent 50%);
  padding-top: 65px;
  padding-left: 20px;

  label {
    position: relative;
    display: flex;
    align-items: flex-end;

    @media (min-width: 768px) {
      justify-content: center;
    }

    img:first-child {
      cursor: pointer;
      width: 105px;
      height: 105px;
      border-radius: 50%;
      border: 5px solid #fff;
      background: #fff;

      @media (min-width: 768px) {
        display: flex;

        width: 120px;
        height: 120px;
      }
    }

    img:last-child {
      cursor: pointer;
      width: 40px;
      height: 40px;

      position: relative;
      left: -30px;
    }
  }

  @media (min-width: 768px) {
    background: none;
    padding-top: 0px;
    margin-top: 80px;
    padding-left: 0px;
  }
`;

export const EditProfileBox = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;

  gap: 16px;
`;

export const TextInput = styled.div`
  width: 100%;
  input {
    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1.5px solid #dbdbdb;
    letter-spacing: -1px;
    padding: 8px 0;

    font-size: 1.6rem;

    &:focus {
      border-bottom: 1.5px solid #ffc700;
      transition: border-color 0.3s ease-in-out;
    }
  }
`;

export const TextLabel = styled.div`
  font-size: 1.6rem;
  color: #767676;
`;

export const EorrorMsg = styled.p`
  color: red;
  text-align: left;
  margin-top: 6px;
  font-size: 1.6rem;
`;
